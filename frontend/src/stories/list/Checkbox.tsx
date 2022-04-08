import styled from "styled-components";

const Container = styled.div<{ width: string }>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
`;

const NoneCheckbox = styled.input`
  display: none;
  :checked + label {
    background-color: #6667ab;
  }
`;

const StyledCheckbox = styled.label`
  display: inline-block;
  width: 15px;
  height: 15px;
  border: 1px solid black;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    width: 12px;
    height: 12px;
  }
`;

type ArtType = "all" | "first" | "second";
interface CheckboxProps {
  id: string;
  label: string;
  width?: string;
  artType: ArtType;
  onChangeArtType: (selectedArtType: ArtType) => void;
}

const Name = styled.div`
  margin-left: 5px;
`;
const Checkbox = ({
  id,
  label,
  width = "9rem",
  artType,
  onChangeArtType,
}: CheckboxProps) => {
  const onChange = (e: any) => {
    onChangeArtType(e.target.value);
  };
  return (
    <Container width={width}>
      <NoneCheckbox
        id={id}
        value={id}
        checked={artType === id}
        type="radio"
        name="artType"
        onChange={onChange}
      />
      <StyledCheckbox htmlFor={id}></StyledCheckbox>
      <Name>{label}</Name>
    </Container>
  );
};

export default Checkbox;
