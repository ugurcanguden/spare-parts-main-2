import CustomerProfileGeneral from './customerProfile/customerProfileGeneral';


export default function CustomerProfile(props : any) {
    const { customer } = props;

    return (<CustomerProfileGeneral customer = {customer}/>)
}
