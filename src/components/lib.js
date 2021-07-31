import styled from '@emotion/styled'

const Button = styled.button`
  border: none;
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: 0.25rem;
  padding: 0.8rem 1.6rem;
  cursor: pointer;
  color: white;
  font-size: 1.4rem;
  text-transform: uppercase;

  &:hover {
    background-color: ${(props) => props.theme.colors.primaryDark};
  }
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;

  label {
    margin-bottom: 0.5rem;
  }
`

const Input = styled.input`
  display: block;
  width: 100%;
  border: 1px solid ${(props) => props.theme.colors.border};
  background-color: white;
  color: ${(props) => props.theme.colors.secondary};
  line-height: 1.5;
  border-radius: 0.25rem;
  padding: 0.8rem 1.2rem;
`

const Card = styled.div`
  background-color: white;
  border-radius: 6;
  padding: 3rem;
  box-shadow: 1px 3px 6px rgba(0, 0, 0, 0.1);
`

export { Button, FormGroup, Input, Card }
