import { useState } from 'react';
import Styles from './InputForm.module.css';

const InputForm = ({title, type, Width, Height, options, onChange, content}) => {

    const [visiblePassword, setVisiblePassword] = useState(false);

    return (
        <>
            {type !== 'select' && type !== 'area' ? (
                <div className={Styles.inputFormContainer} style={{width: Width, height: Height}}>
                    <input 
                        type={type === 'password' && visiblePassword ? 'text' : type} 
                        className={Styles.inputForm} 
                        required
                        style={{width: Width, height: Height, paddingRight: type === 'password' && '2.5vw'}}
                        onChange={onChange}
                        defaultValue={type !== 'password' ? content : undefined} // Valor por defecto excepto para contraseñas
                    />
                    <label htmlFor="" className={Styles.labelInputForm}>{title}</label>
                    {type === 'password' && (
                        <button 
                            type="button" 
                            className={Styles.eyePassword} 
                            onClick={() => setVisiblePassword(!visiblePassword)}
                        >
                            <img 
                                src={`/Graphics/Icons/${visiblePassword ? 'open' : 'closed'}-eye.png`}
                                alt="" 
                                draggable="false"
                                style={{width: '100%', opacity: '60%'}}
                            />
                        </button>
                    )}
                </div>
            ) : (
                <div className={Styles.inputFormContainer}  style={{width: Width, height: Height}}>
                    {type === 'select' && (
                        <>
                            <select name="" id="" className={Styles.inputForm} onChange={onChange} required style={{width: Width, height: Height}} defaultValue={content}>
                                {options?.map((value) => <option value={value} key={value}>{value}</option>)}
                            </select>
                            <label htmlFor="" className={Styles.labelInputForm}>{title}</label>
                        </>
                    )}
                    {type === 'area' && (
                        <>
                            <textarea 
                                name="" 
                                id="" 
                                cols="30" 
                                rows="10" 
                                className={Styles.inputForm} 
                                style={{ width: Width, height: Height, resize: "none", paddingTop: '10px' }} 
                                defaultValue={content} // Valor por defecto para textarea
                            ></textarea>
                            <label htmlFor="" className={Styles.labelInputForm}>{title}</label>
                        </>
                    )}
                </div>
            )}
        </>
    );
}

export default InputForm;
