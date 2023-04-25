import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value : any[], filterString: string, productName:string): any[] {
    const result:any =[];
    if(!value || filterString==='' || productName ===''){
      return value;
    }
    value.forEach((a:any)=>{
      if(a[productName].trim().toLowerCase().includes(filterString.toLowerCase())){
        result.push(a);
      }
    });
    return result;
  }

}
