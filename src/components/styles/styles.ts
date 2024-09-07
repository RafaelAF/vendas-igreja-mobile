import styled from "styled-components";

export const SelectButtons = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 16px;
    /* background-color: red; */
    width: 100%;
`;

export const ButtonToggle = styled.button`
    border-radius: 5px;
    
    border: 1px solid #D9D9D9;
    background: #FEF5D7;
    color: #000;
    font-weight: 700;
    flex: 1;
    transition: all 300ms;
    &:hover{
        opacity: 0.8;
    }
`;
export const ButtonToggleSelected = styled(ButtonToggle)`
    border-radius: 5px;
    border: 1px solid #3B2800;
    
    background: #FED72F;
`;

export const ContainerTotalValor = styled.div`
    border-radius: 5px;
    border: 1px solid #888;
    background: transparent;
    color: #000;
    width: 100%;
    padding: 5px;
    display: flex;
    justify-content: space-between;
`;

export const CadastroContainer = styled.div`
    width: 85%;
    margin: 0 auto;
    padding: 13px 15px;
    border-radius: 8px;
    background: #ECECEC;
`;


export const LabelContent = styled.label`
    display: flex;
    flex-direction: column;
    color: #000;
    font-weight: 700;
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
    border: 1px solid #000;
    background: rgba(217, 217, 217, 0.20); 
    color: #000;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    padding: 10px 16px;
`;

export const CheckBoxCustom = styled.label`
    color: #000;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    display: flex;
    align-items: center;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    padding-top: 5px;
    cursor: pointer;
    /* font-size: 22px; */
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    &:hover input ~ span {
        background-color: #ccc;
    }
    /* align-self: self-start; */
    input{
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;

        &:checked ~ span{
            background-color: #2196F3;
            &:after{
                display: block;
            }
        }
    }
    span{
        position: absolute;
        top: 3px;
        left: 0;
        height: 25px;
        width: 25px;
        background-color: #eee;
        border: 1px solid #000;
        &:after{
            content: "";
            position: absolute;
            display: none;
            left: 9px;
            top: 5px;
            width: 5px;
            height: 10px;
            border: solid white;
            border-width: 0 3px 3px 0;
            -webkit-transform: rotate(45deg);
            -ms-transform: rotate(45deg);
            transform: rotate(45deg);
        }
    }

`;

export const ButtonCadastro = styled.button`
    width: 100%;
    margin-top: 22px;
    border-radius: 8px;
    border: 1px solid #000031;
    background: #000031;
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

export const PaymentContainer = styled.div`
    /* background-color: red; */
    display: flex;
    gap: 12px;
    /* justify-content: space-between; */
`;

export const PaymentItem = styled.div`
    font-size: 14px;
    border-radius: 5px;
    border: 1px solid #999;
    /* background: rgba(217, 217, 217, 0.20); */
    background-color: #d9d9d9;
    padding: 8px 15px;
`;

export const PaymentItemActive = styled(PaymentItem)`
    border: 1px solid #8F64D4; 
    background-color: #EBDBFF; 
`;

export const SpinnerContainer = styled.div`
    width: 100%;
    margin-top: 50px;
    /* height: 100%; */
    /* background-color: red; */
    display: flex;
    justify-content: center;
    align-items: center;
    img{
        animation-name: rotation;
        animation-duration: 3s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
    }
    @keyframes rotation {
        0%{
            transform: rotate(0deg);
        }
        50%{
            transform: rotate(180deg);
        }
        100%{
            transform: rotate(360deg);
        }
    }
`;

export const SelectTicketsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0 15px;

    div{
        display: flex;
        gap: 10px;
        align-items: center;
    }
    &:not(:nth-child(7)){
        margin-bottom: 5px;
    }
`;

export const TicketItem = styled.button`
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.20);
    background: rgba(217, 217, 217, 0.20);
    display: flex;
    justify-content: center;
    align-items: center;
    outline: 0;
    font-weight: 400;
    color: #000;
    &:hover{
        border-color: #8F64D4;
    }
    &:focus{
        outline: 0;
    }
    span{
        color: #000;
    }
`;

export const CountTicket = styled.div`
    color: #000;
`

export const ButtonConfirmTickets = styled.button`
    border-radius: 4px;
    background: #18BA53;
    margin: 0 auto;
    width: 100%;
    margin-top: 20px;
    color: #fff;
    &:not(:disabled):hover{
        opacity: 0.8;
    }
    &:disabled{
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

export const FishTitle = styled.div`
    display: flex;
    justify-content: center;
    font-size: 2rem;
    color: #000;
`;

export const FinishIcon = styled.img`
    display: flex;
    margin: 15px auto 0;
`;

export const EditContainer = styled.div`
    /* background-color: #ff00ff; */
    height: calc(100% - 57px);
    border-radius: 8px;
    padding: 14px 15px;
    position: relative;
`;

export const ButtonsEditContainer = styled.div`
    position: absolute;
    bottom: 47px;
    width: 92%;
    display: flex;
    justify-content: space-between;
    /* margin-top: 20px; */
    gap: 15px;
    & > button{
        flex: 1;
        color: #000;
        &:nth-child(1){
            background-color: #FF2E2E;
        }
        &:nth-child(2){
            background-color: #45C043;
        }
    }
`

export const HeadTitleVendas = styled.div`
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin: 0;
    color: #000;
    display: flex;
    justify-content: space-between;
    padding: 14px 10px;
    border-bottom: 1px solid #000;
    align-items: center;
    display: grid;
    p{
        grid-column: 1 / 2;
    }
    select {
        grid-column: 2 / 3;
        font-size: 16px;
        outline: 0;
        background-color: #ddd;
        padding: 2px 5px;
        color: #000;
        option{
            color: #000;
            background-color: #ddd;
        }
    }
    button{
        grid-column: 1 / 3;
    }
`;