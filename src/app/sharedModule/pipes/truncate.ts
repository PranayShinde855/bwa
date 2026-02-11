import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'truncate' })
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 20, suffix: string = '...'): string {
    if (!value) return value;
    return value.length <= limit ? value : value.substring(0, limit) + suffix;
  }
}   