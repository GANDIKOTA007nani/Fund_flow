import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Groups from '../Images/Groups.jpg';

const CubeAnimation = keyframes`
  0% { transform: rotateY(90deg); }
  100% { transform: rotateY(360deg); }
`;

const CenteredContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  perspective: 1000px;
`;

const Cube = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
  transform-style: preserve-3d;
  animation: ${CubeAnimation} 3s infinite linear;
  transform: ${({ rotating }) => (rotating ? 'rotateY(90deg)' : 'rotateY(450deg)')};
  transition: transform 1s ease-in-out;
`;

const CubeFace = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 5px solid rgba(255, 255, 255, 0.5);
  box-shadow: 10px 10px 10px rgba(0.3, 0.3, 0.3, 0.3);
`;

const FrontFace = styled(CubeFace)`
  transform: translateZ(50px);
  background-color: black;
`;

const BackFace = styled(CubeFace)`
  transform: translateZ(-50px) rotateY(180deg);
  background-color: black;
`;

const LeftFace = styled(CubeFace)`
  transform: rotateY(-90deg) translateZ(50px);
  background-color: black;
`;

const RightFace = styled(CubeFace)`
  transform: rotateY(90deg) translateZ(50px);
  background-color: black;
`;

const TopFace = styled(CubeFace)`
  transform: rotateX(90deg) translateZ(50px);
  background-color: black;
`;

const BottomFace = styled(CubeFace)`
  transform: rotateX(-90deg) translateZ(50px);
  background-color: black;
`;


function RotatingCube() {
  const [rotating, setRotating] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRotating(false);
    }, 5000); // Rotate for 5 seconds

    return () => clearTimeout(timeout);
  }, []);

  return (
    <CenteredContainer>
      {rotating ? (
        <Cube rotating={rotating}>
          <FrontFace></FrontFace>
          <BackFace></BackFace>
          <LeftFace></LeftFace>
          <RightFace></RightFace>
          <TopFace></TopFace>
          <BottomFace></BottomFace>
        </Cube>
      ) : (
        <img src={Groups} alt="Groups" style={{ width: '120px', height: '120px', boxShadow: '10px 10px 20px cyan' }} />
      )}
    </CenteredContainer>
  );
}

export default RotatingCube;
