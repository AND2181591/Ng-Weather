import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'boldLetters'
})
export class BoldLettersPipe implements PipeTransform {
    transform(value: string, searchText: string): string {
        return value.replace(new RegExp(`(${searchText})`, 'gi'), '<strong>$1</strong>');
    }
}