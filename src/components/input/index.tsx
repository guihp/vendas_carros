import { RegisterOptions, UseFormRegister} from "react-hook-form"


interface InputProps {
    type: string;
    placeholder: string;
    name: string;
    register: UseFormRegister<any>;
    error?: string;
    rules?: RegisterOptions;
}


const Input = ({ type, placeholder, name, register, error, rules }: InputProps) => {
    return ( 
        <div>
            <input 
            className="w-full border-2 rounded-full h-11 px-3"
            placeholder={placeholder} 
            type={type} 
            {...register(name, rules)}
            id={name}
            />
            {error && <p className="my-1 text-red-500">{error}</p>}
        </div>
     );
}
 
export default Input;