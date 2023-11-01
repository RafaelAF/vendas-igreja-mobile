import styled from "styled-components";

export const SelectButtons = styled.div`
    display: flex;
    justify-content: space-evenly;
    /* background-color: red; */
    width: 100%;
`;

export const ButtonToggle = styled.button`
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.20);
    background: rgba(217, 217, 217, 0.20);
    &:hover{
        border-color: #8F64D4;
    }
`;
export const ButtonToggleSelected = styled(ButtonToggle)`
    border-radius: 5px;
    border: 1px solid #8F64D4;
    background: #EBDBFF;
`;

export const CadastroCointainer = styled.div`
    width: 85%;
    margin: 0 auto;
    padding: 13px 15px;
    border-radius: 8px;
    background: rgba(117, 90, 203, 0.25);
`;


export const LabelContent = styled.label`
    display: flex;
    flex-direction: column;
`;

export const InputGroup = styled.div`
    /* width: 80%; */
    display: flex;
    justify-content: space-between;
    label:first-child{
        width: 55%;
    }
    label:last-child{
        width: 40%;
    }
`;

export const InputCustom = styled.input`
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.20);
    background: rgba(217, 217, 217, 0.20); 
    color: #000;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    padding: 10px 16px;
`;

export const ButtonCadastro = styled.button`
    width: 100%;
    margin-top: 22px;
    border-radius: 8px;
    border: 1px solid #000;
    background: #45C043;
    color: #fff;
`;

export const ListContainer = styled.div`
    border-radius: 8px;
    background: rgba(117, 98, 203, 0.20);
    position: relative;
    display: flex;
    flex-direction: column;
    /* gap: 10px; */
    width: 100%;
    height: 97%;
`;