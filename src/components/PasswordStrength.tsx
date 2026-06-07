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
      <p>Password requirements:</p>
      <ul>
        <li style={{ color: hasNumber ? 'green' : 'red' }}>
          Contains a number
        </li>
        <li style={{ color: hasUppercase ? 'green' : 'red' }}>
          Contains uppercase letter
        </li>
        <li style={{ color: hasLowercase ? 'green' : 'red' }}>
          Contains lowercase letter
        </li>
        <li style={{ color: hasSpecialChar ? 'green' : 'red' }}>
          Contains special character
        </li>
      </ul>
    </div>
  );
};
