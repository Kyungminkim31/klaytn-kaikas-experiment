import React  from 'react';

type GreetingProps = {
    name: string;
}

// old function style
function Index({name = 'Kyungmin'}: GreetingProps) {
  return (
    <>
      <h1>Basic Index Page</h1>
      <div>{name}</div>
    </>
  );
}

export default Index;