import React, { useState, useEffect  } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import {
  Box,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  AlertIcon,
  Center,
} from '@chakra-ui/react';

function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [error, setError] = useState('');
  const [showAlert, setShowAlert] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset all error messages
    setError('');
    setEmailError('');
    setPasswordError('');
    setPhoneNumberError('');

    // Basic form validation
    if (!email.trim() && !password.trim() && !firstName.trim() && !lastName.trim() && !phoneNumber.trim()) {
      setError('Please fill in all the fields.');
      return;
    }
    if (!email.trim()) {
      setEmailError('Please enter your email address.');
      return;
    }
    if (!password.trim()) {
      setPasswordError('Please enter your password.');
      return;
    }
    if (!firstName.trim()) {
      setError('Please enter your first name.');
      return;
    }
    if (!phoneNumber.trim()) {
      setPhoneNumberError('Please enter your phone number.');
      return;
    }

      // Function to check if any input field has been modified

 

    // Additional validation logic (e.g., email format, password complexity, etc.)
    if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      return;
    }

    if (!isValidPhoneNumber(phoneNumber)) {
      setPhoneNumberError('Please enter a valid phone number.');
      return;
    }

    // Simulate an API call for user registration (replace with actual API call)
    try {
      const response = await fetch('YOUR_USER_REGISTRATION_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, firstName, lastName: lastName || null, phoneNumber }),
      });

      const data = await response.json();

      if (response.ok) {
        // User registration successful, handle accordingly (e.g., show success message)
        console.log('User registration successful!');
      } else {
        // User registration failed, display error message
        setError('An error occurred during user registration.');
      }
    } catch (error) {
      console.error('Error during user registration:', error.message);
      setError('An error occurred during user registration.');
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError('');
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
    setPhoneNumberError('');
  };

  const isValidEmail = (email) => {
    // Basic email validation regex pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const isValidPhoneNumber = (phoneNumber) => {
    // Basic phone number validation regex pattern
    // Here, we assume that the valid phone number consists of exactly 11 digits
    const phoneNumberPattern = /^[0-9]{11}$/;
    return phoneNumberPattern.test(phoneNumber);
  };

  

  const togglePasswordVisibility = () => {
    setShowPassword(true);
    setTimeout(() => {
      setShowPassword(false);
    }, 300);
  };
// alert disappear after 5 seconds

  return (
    <Box minHeight="50vh" display="flex" alignItems="center" justifyContent="center" bg="orange.100">
      <Box bg="orange.50" p={8} rounded="md" shadow="md" w="full" maxW="md">
        <Center>
          <h2 className="text-4xl font-bold mb-16">Sign Up</h2>
        </Center>
       
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter email"
                focusBorderColor={emailError ? 'red.400' : 'orange.400'}
              />
                {emailError && (
              <Box color="red.500" fontSize="sm" textAlign="end" mt="-4px" >
                {emailError}
              </Box>
            )}
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                placeholder="Password"
                pr="4.5rem"
                focusBorderColor={passwordError ? 'red.400' : 'orange.400'}
              />
              <Button
                size="sm"
                pos="absolute"
                zIndex="1"
                right="1rem"
                top="70%"
                transform="translateY(-50%)"
                onClick={togglePasswordVisibility}
              >
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className="w-4 h-6 text-gray-500 cursor-pointer"
                />
              </Button>
              {passwordError && (
              <Box color="red.500" fontSize="sm" textAlign="end" mt="-4px" >
                {passwordError}
              </Box>
            )}
            </FormControl>

            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input
                type="text"
                value={firstName}
                onChange={handleFirstNameChange}
                placeholder="First Name"
              />
                {/* {emailError && (
              <Box color="red.500" fontSize="sm" textAlign="end" mt="-4px" >
                {Error}
              </Box>
            )} */}
            </FormControl>

            <FormControl>
              <FormLabel>Last Name</FormLabel>
              <Input
                type="text"
                value={lastName}
                onChange={handleLastNameChange}
                placeholder="Last Name (optional)"
              />
              {/* No error message for Last Name */}
            </FormControl>

            <FormControl>
              <FormLabel>Phone Number</FormLabel>
              <Input
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                placeholder="Phone (digits only)"
                focusBorderColor={phoneNumberError ? 'red.400' : 'orange.400'}
              />
                {phoneNumberError && (
              <Box color="red.500" fontSize="sm" textAlign="end" mt="-4px" >
                {phoneNumberError}
              </Box>
            )}
            </FormControl>

            <Button type="submit" colorScheme="orange" size="lg" fontSize="md">
              Sign Up
            </Button>
          </Stack>
        </form>
        <Center>
          <h6 className="text-gray-500 text-sm mt-4">Already have an account?</h6>
        </Center>
      </Box>

      {showAlert && error && (
          <Alert status="error"   
          position="absolute"
          bottom="1rem"
          right="1rem"
          zIndex="999"
          maxW="xs"
           borderRadius="md">
            <AlertIcon />
            {error}
          </Alert>
        )}
    </Box>

  );
}

export default SignUpForm;