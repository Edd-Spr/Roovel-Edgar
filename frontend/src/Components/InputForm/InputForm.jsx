import { useState } from 'react';
import './InputForm.css'

const InputForm = ({title, type, Width, Height, options}) => {

    const [visiblePassword, setVisiblePassword] = useState(false);

    return (
        <>
            {type !== 'select' && type !== 'area' ? (
                <div className="inputFormContainer">
                    <input 
                        type={type === 'password' && visiblePassword ? 'text' : type} 
                        className='inputForm' 
                        required
                        style={{width: Width, height: Height, paddingRight: type == 'password' && '2.5vw'}}
                    />
                    <label htmlFor="" className='labelInputForm'>{title}</label>
                    {type === 'password' && (
                        <button className='eyePassword' onClick={() => setVisiblePassword(!visiblePassword)}>
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
                <div className="inputFormContainer">
                    {type == 'select' &&
                        (<>
                            <select name="" id="" className='inputForm' required style={{width: Width, height: Height}}>
                                {options?.map((value) => <option value={value} key={value}>{value}</option>)}
                            </select>
                            <label htmlFor="" className='labelInputForm'>{title}</label>
                        </>) 
                    }
                    {type == 'area' &&
                        (<>
                            <textarea 
                                name="" 
                                id="" 
                                cols="30" 
                                rows="10" 
                                className="inputForm" 
                                style={{ width: Width, height: Height, resize: "none", paddingTop: '10px' }} 
                            ></textarea>
                            <label htmlFor="" className='labelInputForm'>{title}</label>
                        </>) 
                    }
                </div>
            )}
        </>
    )
}

export default InputForm;