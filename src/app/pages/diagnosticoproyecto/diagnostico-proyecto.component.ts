
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  showModal = false;
  selectedFloor: string | null = null;
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
      primerNivel: [[]],
      segundoNivel: [[]],
      segundoNivelMasTerraza: [[]],
      otros: [''],
      estiloFachada: ['', Validators.required]
    });

    this.form.get('country')!.valueChanges.subscribe(value => {
      if (value === 'Perú') {
        this.form.get('address')!.setValidators([Validators.required, Validators.pattern('^[A-Za-z ]+$')]);
      } else {
        this.form.get('address')!.clearValidators();
      }
      this.form.get('address')!.updateValueAndValidity();
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
          this.message = '¡ESTUPENDO! CONTINUEMOS CON EL PASO 3.';
          setTimeout(() => {
            this.showMessage = false;
            this.currentStep = 3;
            this.currentQuestion = 1;
            this.progressBarWidth = '20%';
          }, 5000);
        }
      }
    }
  }

  onBack() {
    if (this.currentQuestion > 1) {
      this.currentQuestion--;
      this.progressBarWidth = `${this.currentQuestion * 20}%`;
      console.log("Pregunta actual:", this.currentQuestion);
    }
  }
}