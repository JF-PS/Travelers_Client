import React, { useState, useMemo,useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import useLocationSocket from "../../hooks/useLocationSocket";
import FormGroup from '@mui/material/FormGroup';
import Layout from '../Layout/Layout';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {updateGeoSeetings} from '../../actions/auth';

const PocSeeting = () => {

    const user = useMemo(() => JSON.parse(localStorage.getItem('profile')), []);
    const {EmitUserLocationBlocked} = useLocationSocket();
    const auth = ((user && user.result.geolocation && user.result.geolocation.authorization) ? true : false);
    const [authorization, setAuthorization] = useState(auth);
    const dispatch = useDispatch();
    const history = useHistory();
    const [form, setForm] = useState({ 
        user_id: (user) ? user.result.id : null, 
        authorization: auth, 
        start_date: ((user && user.result.geolocation && user.result.geolocation.start_date) ? user.result.geolocation.start_date : null), 
        end_date: ((user && user.result.geolocation && user.result.geolocation.end_date) ? user.result.geolocation.end_date : null)
    });

    const handleMessageSubmit = (e) => {
        e.preventDefault();
        EmitUserLocationBlocked(form);
        dispatch(updateGeoSeetings(form, history));
    }

    useEffect(() => {
        setForm((current) => ({ ...current, authorization }))
    }, [authorization]);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    return (
        <Layout>
            {(user) ? (
                <form  display="flex" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#DCDCDC', border: '1px solid #808080', borderRadius: '10px', padding: '30px'}} onSubmit={handleMessageSubmit}  noValidate autoComplete="off">
                    <h3>Autorisé la géolocalisation ?</h3>
                    <FormGroup>
                        <FormControlLabel 
                            control={<Switch 
                                checked={authorization} 
                                onChange={(e) => {
                                    setAuthorization((current) => !current)
                                }} 
                            />} 
                            label={(authorization) ? 'Oui' : 'Non'} 
                            name="authorization"
                            value={authorization}
                        />

                        {(authorization) && (
                            <>
                                <TextField
                                    id="datetime-local"
                                    label="De"
                                    type="datetime-local"
                                    name="start_date"
                                    defaultValue={form.start_date}
                                    onChange={handleChange}
                                    sx={{ width: 250 }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    id="datetime-local"
                                    label="À"
                                    type="datetime-local"
                                    name="end_date"
                                    onChange={handleChange}
                                    defaultValue={form.end_date}
                                    sx={{ width: 250 }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </>
                        )}

                        <Button variant="contained" type="submit">Update Seetings</Button>
                    </FormGroup>
                </form>
            ) : (
                <h3>Vous devez vous connectez pour pouvoir acéder à vos paramètres.</h3>
            ) }
           
        </Layout>

    )
}

export default PocSeeting
