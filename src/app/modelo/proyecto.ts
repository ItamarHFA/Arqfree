import { EstiloFachada } from "./estilo-fachada";
import { Piso } from "./piso";
import { PrimerNivel } from "./primer-nivel";
import { SegundoNivel } from "./segundo-nivel";
import { TercerNivel } from "./tercer-nivel";
import { TipoProyecto } from "./tipo-proyecto";

export class Proyecto {
    id!: number;
    nombreCliente!: string;
    numeroCelular!: string;
    correo!: string;
    tipoProyecto!: TipoProyecto;
    area!: string;
    piso!: Piso;
    estiloFachada!: EstiloFachada;
    numeroIntegrantes!: number;
    coloresFavoritos!: string;
    mascota!: string;
    espacioFavorito!: string;
    automovil!: string;
    referenciaVivienda!: string;
    otrosPrimerNivel?: string;
    otrosSegundoNivel?: string;
    otrosTercerNivel?: string;
    primerNivel!: PrimerNivel[];
    segundoNivel!: SegundoNivel[];
    tercerNivel!: TercerNivel[];
    fechaCreacion!: string;
}
