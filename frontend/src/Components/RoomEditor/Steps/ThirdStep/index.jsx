import Styles from './ThirdStep.module.css';
import { motion } from 'framer-motion';

const ThirdStep = ({setHouseEditorProgress}) => { 

    return (
        <motion.article
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
 
    </motion.article>
    )
}

export default ThirdStep;