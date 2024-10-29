import * as deepar from "deepar";

class DeepARManager {
  private static instance: DeepARManager | null = null;
  private deepAR: deepar.DeepAR | null = null;

  // Lista de efectos
  private effects = {
    bigote: "",
    alas: "https://firebasestorage.googleapis.com/v0/b/eviusauth.appspot.com/o/colombia4.0%2Falas.deepar?alt=media&token=78760047-a5b9-4ca0-bbb9-447414eb9054",
    glasses:
      "https://firebasestorage.googleapis.com/v0/b/eviusauth.appspot.com/o/colombia4.0%2FGlasses.deepar?alt=media&token=0cc77777-f4ed-4573-ad1c-2fc0067a0c5d",
    mascara:
      "https://firebasestorage.googleapis.com/v0/b/eviusauth.appspot.com/o/colombia4.0%2Fmascara.deepar?alt=media&token=bad27506-0787-4a22-8604-8e19b3da917c",
  };

  private constructor() {}

  public static getInstance(): DeepARManager {
    if (!DeepARManager.instance) {
      DeepARManager.instance = new DeepARManager();
    }
    return DeepARManager.instance;
  }

  public async initialize(effect?: string): Promise<void> {
    if (this.deepAR) return; // Ya está inicializado

    this.deepAR = await deepar.initialize({
      licenseKey:
        "4f0a7bfaa7ad51bf4de83dc9d9db7ff36d5efe504894d1d30580de169b9e278dbd994020650efcac",
      previewElement: document.querySelector("#myNewDiv") as HTMLElement,
      effect: effect ?? this.effects.alas,
      additionalOptions: {
        hint: "enableFaceTrackingCnn",
        cameraConfig: {
          facingMode: "environment",
          disableDefaultCamera: true,
        },
      },
    });
  }

  public getInstanceDeepAR(): deepar.DeepAR | null {
    return this.deepAR;
  }

  public stopCamera(): void {
    if (this.deepAR) {
      this.deepAR.stopCamera();
      this.deepAR = null; // Limpieza
    }
  }

  public switchEffect(effectKey: keyof typeof this.effects): void {
    if (this.deepAR && this.effects[effectKey]) {
      this.deepAR.switchEffect(this.effects[effectKey]);
    } else {
      console.error(`Effect ${effectKey} does not exist.`);
    }
  }
}

// Uso en tu componente
export const deepARManager = DeepARManager.getInstance();
