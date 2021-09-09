import React, { useState } from 'react';
import { Data } from '../../systemdata/FAQ';
import styled from 'styled-components';
import { IconContext } from 'react-icons';
import { BsChevronCompactUp, BsChevronDown } from 'react-icons/bs';

const AccordionSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background: #fff;
`;

const Container = styled.div`
  position: absolute;
  top: 20%;
  width: 100%;
  max-width: 700px;
  box-shadow: 2px 10px 35px 1px rgba(153, 153, 153, 0.3);
`;

const Header = styled.div`
  color: #000;
  text-align: center;
  margin-top: 20px;
`;

const Wrap = styled.div`
  background: #d9eedb;
  color: #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  text-align: center;
  cursor: pointer;
  h1 {
    padding: 2rem;
    font-size: 1.5rem;
  }
  span {
    margin-right: 1.5rem;
  }
`;

const Dropdown = styled.div`
  background: #fff;
  color: #000;
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    font-size: 1.5rem;
  }
`;

const Accordion = () => {
  const [clicked, setClicked] = useState(false);

  const toggle = index => {
    if (clicked === index) {
      return setClicked(null);
    }

    setClicked(index);
  };

  return (
    <IconContext.Provider value={{ color: '#000', size: '25px' }}>
      <Header>
        <h1>
          คำถามที่พบบ่อย <i class='fas fa-question-circle'></i>
        </h1>
      </Header>
      <AccordionSection>
        <Container>
          {Data.map((item, index) => {
            return (
              <>
                <Wrap onClick={() => toggle(index)} key={index}>
                  <h1>{item.question}</h1>
                  <span>
                    {clicked === index ? (
                      <BsChevronCompactUp />
                    ) : (
                      <BsChevronDown />
                    )}
                  </span>
                </Wrap>
                {clicked === index ? (
                  <Dropdown>
                    <p>{item.answer}</p>
                  </Dropdown>
                ) : null}
              </>
            );
          })}
        </Container>
      </AccordionSection>
    </IconContext.Provider>
  );
};

export default Accordion;
