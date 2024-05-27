
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-diagnostico-proyecto',
  templateUrl: './diagnostico-proyecto.component.html',
  styleUrls: ['./diagnostico-proyecto.component.css']
})
export class DiagnosticoProyectoComponent implements OnInit {
  currentQuestion = 1;
  progressBarWidth: string = '20%';
  proyectos = ['Unifamiliar', 'Multifamiliar', 'Comercial'];
  pisos = ['1 NIVEL', '2 NIVELES', '2 NIVELES + TERRAZA'];
  paises = [
    // Sudamérica
    'Argentina', 'Bolivia', 'Brasil', 'Chile', 'Colombia', 'Ecuador', 'Guyana', 'Paraguay', 'Perú', 'Surinam', 'Uruguay', 'Venezuela',
    // Europa
    'Alemania', 'España', 'Francia', 'Italia', 'Reino Unido', 'Portugal', 'Rusia', 'Países Bajos', 'Bélgica', 'Suiza',
    // África
    'Nigeria', 'Sudáfrica', 'Egipto', 'Argelia', 'Etiopía', 'Ghana', 'Kenia', 'Uganda', 'Angola', 'Mozambique',
    // Norteamérica
    'Estados Unidos', 'Canadá', 'México'
  ];
  form!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
      projectType: ['', Validators.required],
      floor: ['', Validators.required],
      country: ['', Validators.required],
      address: ['']
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

  get floor() {
    return this.form.get('floor');
  }

  get country() {
    return this.form.get('country');
  }

  get address() {
    return this.form.get('address');
  }

  onContinue() {
    console.log('Formulario actual:', this.form.value);
    if (this.currentQuestion === 1 && this.name?.invalid) {
      this.name.markAsTouched();
    } else if (this.currentQuestion === 2 && this.projectType?.invalid) {
      this.projectType.markAsTouched();
    } else if (this.currentQuestion === 3 && this.floor?.invalid) {
      this.floor.markAsTouched();
    } else if (this.currentQuestion === 4 && this.country?.invalid) {
      this.country.markAsTouched();
    } else if (this.currentQuestion === 5 && this.country?.value === 'Perú' && this.address?.invalid) {
      this.address.markAsTouched();
    } else {
      console.log("Formulario enviado");
      if (this.currentQuestion < 5) {
        this.currentQuestion++;
        this.progressBarWidth = `${this.currentQuestion * 20}%`;
        console.log("Pregunta actual:", this.currentQuestion);
      }
    }
  }

  onSave() {
    console.log('Formulario guardado:', this.form.value);
    // Aquí puedes agregar la lógica para guardar el formulario
  }

  onCancel() {
    console.log('Formulario cancelado');
    this.currentQuestion = 1;
    this.progressBarWidth = '20%';
    this.form.reset();
    this.form.markAsUntouched();
    this.form.markAsPristine();
  }
}