import styled from "styled-components";

export const TextInput = styled.input`
  font-size: 24px;
  width: 80%;
  border: none;
  border-bottom: 1px solid gray;
  padding: 5px 10px;

  &:focus {
    outline: none;
  }

  &::placeholder {
    font-size: 16px;
  }
`;

export default TextInput;
