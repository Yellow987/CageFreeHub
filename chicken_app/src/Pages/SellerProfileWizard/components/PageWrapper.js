import { Button } from '@mui/material'

export function PageWrapper(props) {
    
    return (
        <section>
        {props.element}
        {props.page !== 0 ? <Button onClick={() => props.changePage('back')}>Back</Button> : <></>}
        {props.page !== 6 ?
            <Button onClick={() => props.changePage('next')}>Next hi</Button> : 
            <Button type='submit'>Submit for approval</Button>
        }
        </section>
    )
}