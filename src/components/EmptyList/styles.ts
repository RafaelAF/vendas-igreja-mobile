import styled from "styled-components";

export const ListEmptyContainer = styled.div`
    /* background-color: red; */
    display: flex;
    flex-direction: column;
    align-items: center;
    img{
        width: 50%;
        margin: 20px 0;
    }
    p{
        margin: 0;
        width: 55%;
        text-align: center;
        color: #CC8BEB;
        &:nth-child(1){
            background-color: red;
        }
    }
    /* height: 100%; */
    /* width: 100%; */
`;