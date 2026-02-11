import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  async convertBase64ToBlobWithMetadata(base64File: string, contentType: string, fileName: string) {
    const response = await fetch(base64File);
    const arrayBuffer = await response.arrayBuffer();

    const blob = new Blob([arrayBuffer], { type: contentType });

    //File for API: if needed.
    const file = new File([blob], 'filename.txt', { type: 'text/plain' });
    const base64String = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));

    return {
      blob,
      base64: `data:${contentType};base64,${base64String}`,
      type: contentType,
      name: fileName
    };
  }

  detectFileType(base64: string): string | null {
    if (base64.startsWith('/9j/')) return 'image/jpeg';
    if (base64.startsWith('iVBORw0KGgo')) return 'image/png';
    if (base64.startsWith('R0lGOD')) return 'image/gif';
    if (base64.startsWith('JVBERi0')) return 'application/pdf';
    if (base64.startsWith('UEs')) return 'application/vnd.openxmlformats-officedocument';
    return null; // Unknown type
  }

}
