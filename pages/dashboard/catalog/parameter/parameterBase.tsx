import { ParameterInputType } from '@cryptobigbang-constants';
import { ParameterValueType } from '@cryptobigbang-enums'; 
const ParameterBase=() =>{

const getInputType =(e:string):string=>{  
    let inputType = ParameterInputType.String;   
    switch (e) {
        case ParameterValueType.string: 
        inputType=ParameterInputType.String;       
        break;
        case ParameterValueType.number: 
        inputType = ParameterInputType.Number;        
        break;
        case ParameterValueType.date: 
        inputType=ParameterInputType.Date;        
        break;
        case ParameterValueType.decimal: 
        inputType=ParameterInputType.Decimal ;   
        break;
        case ParameterValueType.checkbox: 
        inputType=ParameterInputType.Checkbox;         
        break; 
        default:
        break;
    } 
    return inputType;
} 
const optionList = [
    { value: ParameterValueType.string, label: ParameterInputType.String },
    { value: ParameterValueType.number, label: ParameterInputType.Number },
    { value: ParameterValueType.date, label: ParameterInputType.Date },
    { value: ParameterValueType.decimal, label: ParameterInputType.Decimal },
    { value: ParameterValueType.checkbox, label: ParameterInputType.Checkbox } 
]
 
const getValue = (e:any,inputType : string)=>{ 
  let value = "";
  if(inputType == ParameterInputType.Checkbox)
    value = e.target.checked.toString();
  else 
    value=e.target.value.toString();
    return value;
}
  return {
      getInputType,
      optionList,
      getValue
    }
}
export default ParameterBase;
