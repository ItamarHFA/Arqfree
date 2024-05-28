
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';
@Component({
  selector: 'app-diagnostico-proyecto',
  templateUrl: './diagnostico-proyecto.component.html',
  styleUrls: ['./diagnostico-proyecto.component.css']
})
export class DiagnosticoProyectoComponent implements OnInit {
  currentStep = 1;
  currentQuestion = 1;
  progressBarWidth: string = '20%';
  proyectos = ['Unifamiliar', 'Multifamiliar', 'Comercial'];
  pisos: { [key: string]: string[] } = {
    Unifamiliar: ['1 nivel', '2 niveles + terraza', 'Otros'],
    Multifamiliar: ['1 nivel', '2 niveles + terraza', '3 a más'],
    Comercial: ['1 nivel', '2 niveles + terraza', '3 niveles a más']
  };
  filteredPisos: string[] = [];
  paises = [
    'Argentina', 'Bolivia', 'Brasil', 'Chile', 'Colombia', 'Ecuador', 'Guyana', 'Paraguay', 'Perú', 'Surinam', 'Uruguay', 'Venezuela',
    'Alemania', 'España', 'Francia', 'Italia', 'Reino Unido', 'Portugal', 'Rusia', 'Países Bajos', 'Bélgica', 'Suiza',
    'Nigeria', 'Sudáfrica', 'Egipto', 'Argelia', 'Etiopía', 'Ghana', 'Kenia', 'Uganda', 'Angola', 'Mozambique',
    'Estados Unidos', 'Canadá', 'México'
  ];
  primerNivel = ['COMEDOR', 'BAÑO DE VISITA', 'ESTACIONAMIENTO', 'ESTUDIO', 'SALA', 'COCINA', 'DORMITORIO', 'TERRAZA'];
  segundoNivel = ['DORMITORIO PRINCIPAL', 'DORMITORIO SECUNDARIO', 'ZONA DE STAR'];
  segundoNivelMasTerraza = ['ZONA DE SERVICIO', 'ZONA SOCIAL'];
  estilosFachada = ['INTROSPECTIVA', 'MODERNA', 'POSMODERNA'];
  form!: FormGroup;
  showMessage = false;
  message = '';

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
      projectType: ['', Validators.required],
      area: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9 ]+$')]],
      floor: ['', Validators.required],
      country: ['', Validators.required],
      address: [''],
      primerNivel: this.fb.array(this.primerNivel.map(() => this.fb.control(false)), this.minSelectedCheckboxes(1)),
      segundoNivel: this.fb.array(this.segundoNivel.map(() => this.fb.control(false)), this.minSelectedCheckboxesOrOtros(1)),
      segundoNivelMasTerraza: this.fb.array(this.segundoNivelMasTerraza.map(() => this.fb.control(false)), this.minSelectedCheckboxes(1)),
      otros: [''],
      estiloFachada: ['', Validators.required],
      numIntegrantes: ['', [Validators.required, Validators.min(0)]],
      numMascotas: ['', Validators.required],
      modeloAutomovil: ['', Validators.required],
      coloresFavoritos: ['', Validators.required],
      espaciosFavoritos: ['', Validators.required],
      referenciaVivienda: ['', Validators.required]
    });

    this.form.get('country')!.valueChanges.subscribe(value => {
      if (value === 'Perú') {
        this.form.get('address')!.setValidators([Validators.required, Validators.pattern('^[A-Za-z ]+$')]);
      } else {
        this.form.get('address')!.clearValidators();
      }
      this.form.get('address')!.updateValueAndValidity();
    });

    // Subscribe to value changes of 'otros' field to revalidate 'segundoNivel' form array
    this.form.get('otros')!.valueChanges.subscribe(() => {
      this.form.get('segundoNivel')!.updateValueAndValidity();
    });
  }

  get name() {
    return this.form.get('name');
  }

  get projectType() {
    return this.form.get('projectType');
  }

  get area() {
    return this.form.get('area');
  }

  get floor() {
    return this.form.get('floor');
  }

  get country() {
    return this.form.get('country');
  }

  get address() {
    return this.form.get('address');
  }

  get primerNivelControls() {
    return (this.form.get('primerNivel') as FormArray).controls;
  }

  get segundoNivelControls() {
    return (this.form.get('segundoNivel') as FormArray).controls;
  }

  get segundoNivelMasTerrazaControls() {
    return (this.form.get('segundoNivelMasTerraza') as FormArray).controls;
  }

  minSelectedCheckboxes(min: number) {
    return (formArray: AbstractControl) => {
      const totalSelected = (formArray as FormArray).controls
        .map(control => control.value)
        .reduce((prev, next) => next ? prev + 1 : prev, 0);
      return totalSelected >= min ? null : { required: true };
    };
  }

  minSelectedCheckboxesOrOtros(min: number) {
    return (formArray: AbstractControl) => {
      const totalSelected = (formArray as FormArray).controls
        .map(control => control.value)
        .reduce((prev, next) => next ? prev + 1 : prev, 0);
      const otrosValue = this.form?.get('otros')?.value;
      return totalSelected >= min || (otrosValue && otrosValue.trim() !== '') ? null : { required: true };
    };
  }

  onProjectTypeChange() {
    const selectedProjectType = this.form.get('projectType')!.value;
    this.filteredPisos = this.pisos[selectedProjectType];
  }

  onContinue() {
    console.log('Formulario actual:', this.form.value);
    if (this.currentStep === 1) {
      if (this.currentQuestion === 1 && this.name?.invalid) {
        this.name.markAsTouched();
      } else if (this.currentQuestion === 2 && this.projectType?.invalid) {
        this.projectType.markAsTouched();
      } else if (this.currentQuestion === 3 && this.area?.invalid) {
        this.area.markAllAsTouched();
      } else if (this.currentQuestion === 4 && this.floor?.invalid) {
        this.floor.markAsTouched();
      } else if (this.currentQuestion === 5 && this.country?.invalid) {
        this.country.markAsTouched();
      } else {
        console.log("Formulario enviado");
        if (this.currentQuestion < 5) {
          this.currentQuestion++;
          this.progressBarWidth = `${this.currentQuestion * 20}%`;
          console.log("Pregunta actual:", this.currentQuestion);
        } else if (this.currentQuestion === 5) {
          this.showMessage = true;
          this.message = '¡GENIAL! HAZ CULMINADO EL PASO 1\nCONTINUEMOS CON EL PASO 2';
          setTimeout(() => {
            this.showMessage = false;
            this.currentStep = 2;
            this.currentQuestion = 1;
            this.progressBarWidth = '20%';
          }, 5000);
        }
      }
    } else if (this.currentStep === 2) {
      if (this.currentQuestion === 1 && this.form.get('primerNivel')!.invalid) {
        this.form.get('primerNivel')!.markAllAsTouched();
      } else if (this.currentQuestion === 2 && this.form.get('segundoNivel')!.invalid) {
        this.form.get('segundoNivel')!.markAllAsTouched();
        this.form.get('otros')!.markAsTouched();
      } else if (this.currentQuestion === 3 && this.form.get('segundoNivelMasTerraza')!.invalid) {
        this.form.get('segundoNivelMasTerraza')!.markAllAsTouched();
      } else if (this.currentQuestion === 4 && this.form.get('estiloFachada')!.invalid) {
        this.form.get('estiloFachada')!.markAsTouched();
      } else {
        console.log("Formulario enviado");
        if (this.currentQuestion < 4) {
          this.currentQuestion++;
          this.progressBarWidth = `${(this.currentQuestion + 4) * 20}%`;
          console.log("Pregunta actual:", this.currentQuestion);
        } else if (this.currentQuestion === 4) {
          this.showMessage = true;
          this.message = '¡ESTUPENDO! CONTINUEMOS CON EL PASO 3';
          setTimeout(() => {
            this.showMessage = false;
            this.currentStep = 3;
            this.currentQuestion = 1;
            this.progressBarWidth = '20%';
          }, 5000);
        }
      }
    } else if (this.currentStep === 3) {
      // Validar todas las preguntas del paso 3
      if (this.form.get('numIntegrantes')!.invalid) {
        this.form.get('numIntegrantes')!.markAsTouched();
      } else if (this.form.get('numMascotas')!.invalid) {
        this.form.get('numMascotas')!.markAsTouched();
      } else if (this.form.get('modeloAutomovil')!.invalid) {
        this.form.get('modeloAutomovil')!.markAsTouched();
      } else if (this.form.get('coloresFavoritos')!.invalid) {
        this.form.get('coloresFavoritos')!.markAsTouched();
      } else if (this.form.get('espaciosFavoritos')!.invalid) {
        this.form.get('espaciosFavoritos')!.markAsTouched();
      } else if (this.form.get('referenciaVivienda')!.invalid) {
        this.form.get('referenciaVivienda')!.markAsTouched();
      } else {
        console.log("Formulario enviado");
        this.showMessage = true;
        this.message = '¡PERFECTO! GRACIAS POR BRINDARNOS TU INFORMACIÓN.\n\nAHORA SÍ DESCARGA EL PDF';
        setTimeout(() => {
          this.showMessage = false;
          this.resetForm(); // Resetear el formulario al estado inicial
        }, 5000);
      }
    }
  }

  onBack() {
    if (this.currentStep === 2 && this.currentQuestion === 1) {
      this.currentStep = 1;
      this.currentQuestion = 5;
      this.progressBarWidth = '100%';
    } else if (this.currentStep === 3 && this.currentQuestion === 1) {
      this.currentStep = 2;
      this.currentQuestion = 4;
      this.progressBarWidth = '80%';
    } else if (this.currentQuestion > 1) {
      this.currentQuestion--;
      this.progressBarWidth = `${this.currentQuestion * 20}%`;
    }
    console.log("Pregunta actual:", this.currentQuestion);
  }

  resetForm() {
    this.form.reset({
      country: '' // Establecer el valor inicial del país en vacío
    });
    this.currentStep = 1;
    this.currentQuestion = 1;
    this.progressBarWidth = '20%';
  }
}