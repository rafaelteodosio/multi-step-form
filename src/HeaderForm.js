import React from 'react';
import { Layout } from 'antd';
import { styled } from 'styled-components';
const { Header } = Layout;

const StyledHeader = styled(Header)`
  min-height: 130px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 35px;
  padding-bottom: 35px;
  width: 100%;
  background-color: #fcfcfc;
`;

const StyledImgContainer = styled.div`
  display: flex;
  .Header-branding-logo{
    max-width: 198px;
    width: 100%;
  }
`;

function HeaderForm() {
  return (
    <StyledHeader >
      <StyledImgContainer>
        <a href='https://www.xlr8rms.com/'>
          <img src="//images.squarespace-cdn.com/content/v1/5ea54c774806ba438899e2ba/1590651956694-3E1R4PPJFPEZ47M3WUDU/Logo+RMS.png?format=1500w" alt="XLR8 - Revenue Management System" className="Header-branding-logo" />
        </a>
      </StyledImgContainer>
    </StyledHeader>
  )
}

export default HeaderForm;