import React from 'react';

type Props = {
  fillColor?: string;
};

export const Help: React.FC<Props> = ({ fillColor }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 0.625C9.75024 0.625 7.551 1.29213 5.68039 2.54203C3.80978 3.79193 2.35182 5.56847 1.49088 7.64698C0.629929 9.72548 0.404666 12.0126 0.843573 14.2192C1.28248 16.4257 2.36584 18.4525 3.95667 20.0433C5.54749 21.6342 7.57432 22.7175 9.78085 23.1564C11.9874 23.5953 14.2745 23.3701 16.353 22.5091C18.4315 21.6482 20.2081 20.1902 21.458 18.3196C22.7079 16.449 23.375 14.2498 23.375 12C23.3718 8.98414 22.1724 6.09271 20.0398 3.96018C17.9073 1.82764 15.0159 0.628185 12 0.625ZM12 19C11.7404 19 11.4867 18.923 11.2708 18.7788C11.055 18.6346 10.8868 18.4296 10.7874 18.1898C10.6881 17.9499 10.6621 17.686 10.7127 17.4314C10.7634 17.1768 10.8884 16.943 11.0719 16.7594C11.2555 16.5759 11.4893 16.4509 11.7439 16.4002C11.9985 16.3496 12.2624 16.3756 12.5023 16.4749C12.7421 16.5742 12.9471 16.7425 13.0913 16.9583C13.2355 17.1742 13.3125 17.4279 13.3125 17.6875C13.3125 18.0356 13.1742 18.3694 12.9281 18.6156C12.6819 18.8617 12.3481 19 12 19ZM12.875 13.6712V13.75C12.875 13.9821 12.7828 14.2046 12.6187 14.3687C12.4546 14.5328 12.2321 14.625 12 14.625C11.7679 14.625 11.5454 14.5328 11.3813 14.3687C11.2172 14.2046 11.125 13.9821 11.125 13.75V12.875C11.125 12.6429 11.2172 12.4204 11.3813 12.2563C11.5454 12.0922 11.7679 12 12 12C13.447 12 14.625 11.0156 14.625 9.8125C14.625 8.60938 13.447 7.625 12 7.625C10.553 7.625 9.375 8.60938 9.375 9.8125V10.25C9.375 10.4821 9.28282 10.7046 9.11872 10.8687C8.95463 11.0328 8.73207 11.125 8.5 11.125C8.26794 11.125 8.04538 11.0328 7.88129 10.8687C7.71719 10.7046 7.625 10.4821 7.625 10.25V9.8125C7.625 7.64141 9.58719 5.875 12 5.875C14.4128 5.875 16.375 7.64141 16.375 9.8125C16.375 11.7134 14.87 13.3048 12.875 13.6712Z"
        fill={fillColor || '#1D1E25'}
      />
    </svg>
  );
};