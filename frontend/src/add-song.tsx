import React, {useState} from "react";
import {Formik} from 'formik';
import {TextField} from "@material-ui/core";
// @ts-ignore
import styled from 'styled-components';
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";

const fields = {
    name: 'name',
    artist: 'artist',
    album: 'album',
    year: 'year',
    duration: 'duration',
    image: 'image',
    genre: 'genre',
};

const StyledForm = styled.form`
    background-color: white;
    display: flex;
    flex-direction: row;
    margin: auto;
    width: 1000px;
    padding: 1rem 0;
`;

const CancelBtn = styled(Button)`
  & {
    color: red !important;
  }
`;

interface AddSongProps {
    handleSubmit: any,
    handleClickCancel: any,
}
const AddSong: React.FC<AddSongProps> = ({handleSubmit, handleClickCancel}) => {
    const [focused, setFocused] = useState('');

    return (<Formik
        initialValues={{
            [fields.name]: "Dark Necessities",
            [fields.artist]: "Red Hot Chili Peppers",
            [fields.album]: "Dark Necessities",
            [fields.year]: 2016,
            [fields.duration]: "5:13",
            [fields.image]: "Image",
            [fields.genre]: "Punk",
        }}
        onSubmit={handleSubmit}
    >
        {({handleSubmit, handleChange, handleBlur, values, errors, touched}) => (
            <StyledForm onSubmit={handleSubmit}>
                {Object.keys(fields).map(field => <TextField key={field}
                                                             name={field}
                                                             variant={'outlined'}
                                                             label={field}
                                                             value={values[field]}
                                                             onChange={handleChange}
                                                             onFocus={() => setFocused(field)}
                                                             style={focused === field ? {width: '270px' } : {}}
                                                             onBlur={(e) => {
                                                                 setFocused('');
                                                                 handleBlur(e);
                                                             }}/>)}
                <Button type={'submit'}> Submit </Button>
                <CancelBtn onClick={handleClickCancel}>X</CancelBtn>
            </StyledForm>)}
    </Formik>)
};

AddSong.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
};
export default AddSong;
