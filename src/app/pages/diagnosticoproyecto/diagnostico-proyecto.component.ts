import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { EstiloFachada } from 'src/app/modelo/estilo-fachada';
import { Piso } from 'src/app/modelo/piso';
import { PrimerNivel } from 'src/app/modelo/primer-nivel';
import { Proyecto } from 'src/app/modelo/proyecto';
import { SegundoNivel } from 'src/app/modelo/segundo-nivel';
import { TercerNivel } from 'src/app/modelo/tercer-nivel';
import { TipoProyecto } from 'src/app/modelo/tipo-proyecto';
import { EstiloFachadaService } from 'src/app/servicio/estilo-fachada.service';
import { PisoService } from 'src/app/servicio/piso.service';
import { PrimerNivelService } from 'src/app/servicio/primer-nivel.service';
import { SegundoNivelService } from 'src/app/servicio/segundo-nivel.service';
import { TercerNivelService } from 'src/app/servicio/tercer-nivel.service';
import { TipoProyectoService } from 'src/app/servicio/tipo-proyecto.service';

@Component({
  selector: 'app-diagnostico-proyecto',
  templateUrl: './diagnostico-proyecto.component.html',
  styleUrls: ['./diagnostico-proyecto.component.css']
})
export class DiagnosticoProyectoComponent implements OnInit {
  currentStep = 1;
  currentQuestion = 1;
  progressBarWidth: string = '0%';
  steps = [1, 2, 3];
  completedSteps = 0;
  totalQuestionsStep1 = 2;
  totalQuestionsStep2 = 4;
  totalQuestionsStep3 = 5;

  proyectos: Proyecto[] = [];
  pisos: Piso[] = [];
  primerNivel: PrimerNivel[] = [];
  segundoNivel: SegundoNivel[] = [];
  segundoNivelMasTerraza: TercerNivel[] = [];
  estilosFachada: EstiloFachada[] = [];
  tiposProyecto: TipoProyecto[] = [];
  filteredPisos: Piso[] = [];
  countryCodes = ['+54', '+591', '+55', '+56', '+57', '+593', '+592', '+595', '+51', '+597', '+598', '+58', '+49', '+34', '+33', '+39', '+44', '+351', '+7', '+31', '+32', '+41', '+234', '+27', '+20', '+213', '+251', '+233', '+254', '+256', '+244', '+258', '+1', '+52'];
  form!: FormGroup;
  showMessage = false;
  message = '';

  constructor(private fb: FormBuilder, private router: Router, private estiloFachadaService: EstiloFachadaService,
    private pisoService: PisoService,
    private primerNivelService: PrimerNivelService,
    private segundoNivelService: SegundoNivelService,
    private tercerNivelService: TercerNivelService,
    private tipoProyectoService: TipoProyectoService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
      projectType: ['', Validators.required],
      area: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9 ]+$')]],
      floor: ['', Validators.required],
      address: [''],
      countryCode: ['+54'],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      email: ['', [Validators.required, Validators.email]],
      primerNivel: this.fb.array([], this.minSelectedCheckboxesOrOtros(1, 'otros')),
      segundoNivel: this.fb.array([], this.minSelectedCheckboxesOrOtros(1, 'otrosSegundoNivel')),
      segundoNivelMasTerraza: this.fb.array([], this.minSelectedCheckboxesOrOtros(1, 'otrosTercerNivel')),
      otros: [''],
      otrosSegundoNivel: [''],
      otrosTercerNivel: [''],
      estiloFachada: ['', Validators.required],
      numIntegrantes: ['', [Validators.required, Validators.min(0)]],
      numMascotas: ['', Validators.required],
      modeloAutomovil: ['', [Validators.required, Validators.pattern('^[A-Za-z ]+$')]],
      coloresFavoritos: ['', [Validators.required, Validators.pattern('^[A-Za-z ]+$')]],
      espaciosFavoritos: ['', [Validators.required, Validators.pattern('^[A-Za-z ]+$')]],
      referenciaVivienda: ['', [Validators.required, Validators.pattern('^[A-Za-z ]+$')]]
    });

    // Observers for 'otros' fields to trigger validation updates
    this.form.get('otros')!.valueChanges.subscribe(() => {
      this.form.get('primerNivel')!.updateValueAndValidity();
    });

    this.form.get('otrosSegundoNivel')!.valueChanges.subscribe(() => {
      this.form.get('segundoNivel')!.updateValueAndValidity();
    });

    this.form.get('otrosTercerNivel')!.valueChanges.subscribe(() => {
      this.form.get('segundoNivelMasTerraza')!.updateValueAndValidity();
    });

    this.loadData();
    this.updateProgressBar();
  }

  loadData() {
    this.estiloFachadaService.listar().subscribe(data => {
      this.estilosFachada = data;
    });
    this.pisoService.listar().subscribe(data => {
      this.pisos = data;
    });
    this.primerNivelService.listar().subscribe(data => {
      this.primerNivel = data;
      const primerNivelArray = this.primerNivel.map(() => this.fb.control(false));
      this.form.setControl('primerNivel', this.fb.array(primerNivelArray, this.minSelectedCheckboxesOrOtros(1, 'otros')));
    });
    this.segundoNivelService.listar().subscribe(data => {
      this.segundoNivel = data;
      const segundoNivelArray = this.segundoNivel.map(() => this.fb.control(false));
      this.form.setControl('segundoNivel', this.fb.array(segundoNivelArray, this.minSelectedCheckboxesOrOtros(1, 'otrosSegundoNivel')));
    });
    this.tercerNivelService.listar().subscribe(data => {
      this.segundoNivelMasTerraza = data;
      const segundoNivelMasTerrazaArray = this.segundoNivelMasTerraza.map(() => this.fb.control(false));
      this.form.setControl('segundoNivelMasTerraza', this.fb.array(segundoNivelMasTerrazaArray, this.minSelectedCheckboxesOrOtros(1, 'otrosTercerNivel')));
    });
    this.tipoProyectoService.listar().subscribe(data => {
      this.tiposProyecto = data;
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

  get address() {
    return this.form.get('address');
  }

  get phoneNumber() {
    return this.form.get('phoneNumber');
  }

  get email() {
    return this.form.get('email');
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

  minSelectedCheckboxesOrOtros(min: number, otrosControlName: string) {
    return (formArray: AbstractControl) => {
      const totalSelected = (formArray as FormArray).controls
        .map(control => control.value)
        .reduce((prev, next) => next ? prev + 1 : prev, 0);
      const otrosValue = this.form?.get(otrosControlName)?.value;
      console.log(`totalSelected: ${totalSelected}, otrosValue: ${otrosValue}`); // Debug
      return totalSelected >= min || (otrosValue && otrosValue.trim() !== '') ? null : { required: true };
    };
  }

  onProjectTypeChange(): void {
    const selectedProjectTypeId = this.form.get('projectType')!.value;
    const tipoProyecto = this.tiposProyecto.find(tp => tp.id === selectedProjectTypeId);

    if (tipoProyecto) {
      if (tipoProyecto.descripcion === 'Unifamiliar') {
        this.filteredPisos = this.pisos.filter(p => p.descripcion === '1 nivel' || p.descripcion === '2 niveles' || p.descripcion === 'Otros');
      } else if (tipoProyecto.descripcion === 'Multifamiliar' || tipoProyecto.descripcion === 'Comercial') {
        this.filteredPisos = this.pisos.filter(p => p.descripcion === '1 nivel' || p.descripcion === '2 niveles' || p.descripcion === '3 niveles a más');
      }
    } else {
      this.filteredPisos = [];
    }
  }

  updateProgressBar() {
    let totalQuestions = 0;
    if (this.currentStep === 1) {
      totalQuestions = this.totalQuestionsStep1;
    } else if (this.currentStep === 2) {
      totalQuestions = this.totalQuestionsStep2;
    }

    const totalProgressSteps = this.steps.length - 1;
    const stepProgress = (this.currentQuestion / totalQuestions) * (100 / totalProgressSteps);

    if (this.currentStep === 1) {
      this.progressBarWidth = `${stepProgress}%`;
    } else if (this.currentStep === 2) {
      this.progressBarWidth = `${(100 / totalProgressSteps) + stepProgress}%`;
    } else if (this.currentStep === 3) {
      this.progressBarWidth = `100%`;
    }

    this.completedSteps = Math.floor(parseFloat(this.progressBarWidth) / (100 / totalProgressSteps)) + 1;
  }

  onContinue() {
    if (this.currentStep === 1) {
      // Validaciones para el paso 1
      if (this.currentQuestion === 1 && this.name?.invalid) {
        this.name.markAsTouched();
      } else if (this.currentQuestion === 1 && this.phoneNumber?.invalid) {
        this.phoneNumber.markAsTouched();
      } else if (this.currentQuestion === 1 && this.email?.invalid) {
        this.email.markAsTouched();
      } else if (this.currentQuestion === 2 && this.projectType?.invalid) {
        this.projectType.markAsTouched();
      } else if (this.currentQuestion === 2 && this.area?.invalid) {
        this.area.markAllAsTouched();
      } else if (this.currentQuestion === 2 && this.floor?.invalid) {
        this.floor.markAsTouched();
      } else {
        if (this.currentQuestion < this.totalQuestionsStep1) {
          this.currentQuestion++;
        } else if (this.currentQuestion === this.totalQuestionsStep1) {
          this.showMessage = true;
          this.message = 'Sigamos';
          setTimeout(() => {
            this.showMessage = false;
            this.currentStep = 2;
            this.currentQuestion = 1;
            this.updateProgressBar();
          }, 2000);
        }
      }
    } else if (this.currentStep === 2) {
      // Validaciones para el paso 2
      if (this.currentQuestion === 1 && this.form.get('primerNivel')!.invalid) {
        this.form.get('primerNivel')!.markAllAsTouched();
        this.form.get('otros')!.markAsTouched();
      } else if (this.currentQuestion === 2 && this.form.get('segundoNivel')!.invalid) {
        this.form.get('segundoNivel')!.markAllAsTouched();
        this.form.get('otrosSegundoNivel')!.markAsTouched();
      } else if (this.currentQuestion === 3 && this.form.get('segundoNivelMasTerraza')!.invalid) {
        this.form.get('segundoNivelMasTerraza')!.markAllAsTouched();
        this.form.get('otrosTercerNivel')!.markAsTouched();
      } else if (this.currentQuestion === 4 && this.form.get('estiloFachada')!.invalid) {
        this.form.get('estiloFachada')!.markAsTouched();
      } else {
        if (this.currentQuestion < this.totalQuestionsStep2) {
          this.currentQuestion++;
        } else if (this.currentQuestion === this.totalQuestionsStep2) {
          this.showMessage = true;
          this.message = 'Continuemos';
          setTimeout(() => {
            this.showMessage = false;
            this.currentStep = 3;
            this.currentQuestion = 1;
            this.updateProgressBar();
          }, 2000);
        }
      }
    } else if (this.currentStep === 3) {
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
        this.showMessage = true;
        this.message = 'Finalizamos.';
        setTimeout(() => {
          this.showMessage = false;
          this.router.navigate(['/agradecimiento']); // Redirigir a la página de agradecimiento
          this.resetForm(); // Resetear el formulario al estado inicial
        }, 2000);
      }
    }
    this.updateProgressBar();
  }

  onBack() {
    if (this.currentStep === 2 && this.currentQuestion === 1) {
      this.currentStep = 1;
      this.currentQuestion = this.totalQuestionsStep1;
    } else if (this.currentStep === 3 && this.currentQuestion === 1) {
      this.currentStep = 2;
      this.currentQuestion = this.totalQuestionsStep2;
    } else if (this.currentQuestion > 1) {
      this.currentQuestion--;
    }
    this.updateProgressBar();
  }

  closeMessage() {
    this.showMessage = false;
  }

  resetForm() {
    this.form.reset({
      country: ''
    });
    this.currentStep = 1;
    this.currentQuestion = 1;
    this.progressBarWidth = '0%';
    this.updateProgressBar();
  }
}
