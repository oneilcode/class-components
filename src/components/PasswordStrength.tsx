import { PASSWORD_STRENGTH } from '../constants/passwordStrength';

export const PasswordStrength = ({ password }: { password: string }) => {
  const checkPasswordStrength = (password: string) => ({
    hasNumber: /[0-9]/.test(password),
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasSpecialChar: /[!@#$%^&*]/.test(password),
  });

  const { hasNumber, hasUppercase, hasLowercase, hasSpecialChar } =
    checkPasswordStrength(password);

  return (
    <div className="password-strength">
      <p>{PASSWORD_STRENGTH.requirements}</p>
      <ul>
        <li style={{ color: hasNumber ? 'green' : 'red' }}>
          {PASSWORD_STRENGTH.containsNumber}
        </li>
        <li style={{ color: hasUppercase ? 'green' : 'red' }}>
          {PASSWORD_STRENGTH.containsUpLetter}
        </li>
        <li style={{ color: hasLowercase ? 'green' : 'red' }}>
          {PASSWORD_STRENGTH.containsLowLetter}
        </li>
        <li style={{ color: hasSpecialChar ? 'green' : 'red' }}>
          {PASSWORD_STRENGTH.containsSpecialLetter}
        </li>
      </ul>
    </div>
  );
};
