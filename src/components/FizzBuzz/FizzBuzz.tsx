const FizzBuzz = () => {
  const generateFizzBuzz = (): string[] => {
    const result: string[] = [];
    
    for (let i = 1; i <= 100; i++) {
      if (i % 15 === 0) {
        result.push('FizzBuzz');
      } else if (i % 3 === 0) {
        result.push('Fizz');
      } else if (i % 5 === 0) {
        result.push('Buzz');
      } else {
        result.push(i.toString());
      }
    }
    
    return result;
  };
  const fizzBuzzResults = generateFizzBuzz();
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">FizzBuzz Results</h2>
      <div className="grid grid-cols-10 gap-2 max-w-4xl">
        {fizzBuzzResults.map((value, index) => (
          <div
            key={index}
            className={`p-2 text-center border rounded ${
              value === 'Fizz' ? 'bg-blue-100' :
              value === 'Buzz' ? 'bg-green-100' :
              value === 'FizzBuzz' ? 'bg-purple-100' :
              'bg-gray-50'
            }`}
          >
            {value}
          </div>
        ))}
      </div>
    </div>
  )
}

export default FizzBuzz

export const fizzBuzzLogic = (n: number): string => {
  if (n % 15 === 0) return 'FizzBuzz';
  if (n % 3 === 0) return 'Fizz';
  if (n % 5 === 0) return 'Buzz';
  return n.toString();
};
