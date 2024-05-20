export interface PasswordProps {
  length: number;
  includeUpperCase: boolean;
  includeLowerCase: boolean;
  includeNumber: boolean;
  includeSymbols: boolean;
}

export const getPageName = (route: string) => {
  if (route === '/' || route === '/dashboard') {
    return 'Dashboard';
  } else if (route === '/users') {
    return 'User Listing';
  } else if (route === '/user') {
    return 'Add User';
  } else if (route === '/campaigns') {
    return 'Campaign Listing';
  } else if (route === '/campaign') {
    return 'Add Campaign';
  } else if (route === '/vendor-specs') {
    return 'Specifications';
  } else if (route === '/reports/outbound-client-ping-post') {
    return 'Outbound Client Ping/Post Analysis';
  } else if (route === '/reports/outbound-ping-post') {
    return 'Outbound Ping/Post Analysis';
  } else if (route === '/reports/inbound') {
    return 'Inbound Ping/Post Analysis';
  } else if (route === '/revenue-matrix') {
    return 'Revenue Matrix';
  } else if (route === '/reports/list-leads') {
    return 'List Leads';
  }else if (route === '/reports/outbound-ping-post-analysis') {
    return 'Outbound Ping/Post Analysis';
  }else if (route === '/reports/returns-suite-analysis') {
    return 'Returns Suite Analysis';
  }else if (route === '/reports/commissions') {
    return 'Commissions Report (Non-Payday)';
  } else if (route.match(/^\/user\/[0-9a-fA-F]{24}$/)) {
    return 'User Settings';
  } else if (route.match(/^\/campaign\/[0-9a-fA-F]{24}$/)) {
    return 'Campaign Settings';
  } else if (route === '/quality/import') {
    return 'Import Returns';
  } else if (route === '/quality/returns-suite') {
    return 'Returns Suite';
  } else if (route === '/education-reports/education-client-sales') {
    return 'Education Client Sales';
  } else if (route === '/education-reports/all-search-report') {
    return 'All Search Report';
  } else if (route === '/education-reports/all-result-report') {
    return 'All Result Report';
  }else if (route === '/education-campaigns') {
    return 'All Education Campaigns';
  }  
};

const lowerCasedAlphabets = [...'abcdefghijklmnopqrstuvwxyz'.split('')];
const upperCasedAlphabets = lowerCasedAlphabets.map((alphabet) =>
  alphabet.toUpperCase(),
);
const numbers = [...'1234567890'.split('').map((num) => +num)];
const symbols = [...'!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'.split('')];

const getRandomNumber = (max: number) => Math.floor(Math.random() * max);

/**
 * Generate a random password of length 40 consisting of lowercase letters,uppercase letters,numbers and symbols
 * @returns string
 */
const getRandomPassword = (): string => {
  const randompassword: (string | number)[] = [];
  const params = [
    ...lowerCasedAlphabets,
    ...upperCasedAlphabets,
    ...numbers,
    ...symbols,
  ];
  while (randompassword.length < 40) {
    const randomInt = Math.floor(Math.random() * params.length);
    randompassword.push(params[randomInt]);
  }
  return randompassword.join('');
};

/**
 * Generates a random password based on the provided options
 */
export const generatePassword = (options?: Partial<PasswordProps>): string => {
  if (options) {
    const {
      length,
      includeLowerCase,
      includeNumber,
      includeSymbols,
      includeUpperCase,
    } = options;
    const generatedPasssword = [];

    for (let i = 0; i < 40; i++) {
      includeUpperCase &&
        generatedPasssword.push(
          upperCasedAlphabets[getRandomNumber(upperCasedAlphabets.length)],
        );
      includeLowerCase &&
        generatedPasssword.push(
          lowerCasedAlphabets[getRandomNumber(lowerCasedAlphabets.length)],
        );
      includeNumber &&
        generatedPasssword.push(numbers[getRandomNumber(numbers.length)]);
      includeSymbols &&
        generatedPasssword.push(symbols[getRandomNumber(symbols.length)]);
    }
    /**
     * returns the randomly generated password if generated password length is 0
     */
    if (!generatedPasssword.length)
      return length ? generatePassword().slice(0, length) : generatePassword();
    return length
      ? generatedPasssword.slice(0, length).join('')
      : generatedPasssword.slice(0, 16).join('');
  }

  return getRandomPassword();
};
