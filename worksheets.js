function random(i) { return Math.floor(Math.random()*i) }

function monomial(variable, c) {
  if(c == 0) { return 0 }
  if(c == 1) { return variable }
  if(c == -1) { return '-'+variable }
  return c + variable
}

function polynomial(variable, coefficients) {
  if(coefficients[0] == 0) {
    return monomial(variable, coefficients[1])
  }

  if(coefficients[1] == 0) {
    return coefficients[0]
  }

  var sum = monomial(variable, coefficients[1]) +
    '+' +
    coefficients[0]
  return sum.replace('+-','-')
}

function parens(exp) {
  if(exp.length > 1)
    return '('+exp+')'
  else
    return exp
}

function add_parens(e, operator)
{
  if(operator == '^')
  {
    if(e.last == 'sqrt' || e.last == '+' || e.last == '*' || e.last == '^' || e.last == '/')
      return parens(e.left_side)
  }
  if(operator == '*')
  {
    if(e.last == '+')
      return parens(e.left_side)
  }

  if(random(2) == 0)
    return parens(e.left_side)

  return e.left_side
}

function apply_times(e) {
  var k = random(9)+1
  var l = add_parens(e, '*')

  return {left_side: '' + k + '*' + l, value: k*e.value, last: '*'}
}

function apply_add(e) {
  var k = random(20)

  var l = e.left_side;

  var ret;
  if(random(2) == 0)
  {
    ret = l + ' + ' + k
  }
  else
  {
    ret = k + ' + ' + l
  }
  return {left_side: ret, value: e.value + k, last: '+'}
}

function apply_square(e) {
  var l = add_parens(e,'^')

  return {left_side: l + '^2', value: e.value*e.value, last: '^'}
}

function apply_sqrt(e) {
  var l = add_parens(e, 'sqrt')
  return {left_side: 'sqrt(' + l + ')', value: Math.sqrt(e.value), last: 'sqrt'}
}

function apply_divide(e) {
  var l = add_parens(e, '/')
  var factors = []
  for(var n = 2; n <= Math.abs(e.value); n++) {
    if(e.value % n == 0)
      factors.push(n)
  }
  if(factors.length == 0)
    factors = [1]

  var factor = factors[random(factors.length)]
  return {left_side: '(' + l + ')/'+factor, value: e.value/factor, last: '/'}
}

function apply_random_operation(equation) {
  var operations = [apply_times, apply_add]

  if(equation.value > 1 || equation.value < -1)
    operations.push(apply_divide)

  if(Math.floor(Math.sqrt(equation.value)) == Math.sqrt(equation.value) &&
    equation.last != '^')
    operations.push(apply_sqrt)

  if(equation.last != 'sqrt')
    operations.push(apply_square)

  var operation = operations[random(operations.length)]
  return operation(equation)
}

function problem_undo(variable) {
  var equation = {left_side: variable, value: random(15) - 5, last: null}

  var iterations = random(6)+1;
  for(var i = 0; i < iterations; i++)
  {
    new_equation = apply_random_operation(equation)
    if(Math.abs(new_equation.value) > 200)
      break
    equation = new_equation
  }

  return equation.left_side + ' = ' + equation.value
}

function problem_linear(variable) {
  var answer = random(15) - 5
  var add_constant_0 = 0;
  if(random(4) == 0)
  {
    add_constant_0 = random(10)-5
  }
  var multiply_by = random(10)+1
  var add_x = random(6) - 3
  var add_constant;

  if(random(2) == 0) {
    add_constant = random(10) - 5
  }
  else {
    add_constant = 0
  }

  var left_p = [
    add_constant,
    multiply_by + add_x
  ]
  var right_p = [
    (answer+add_constant_0)*multiply_by + add_constant + add_x*add_constant_0,
    add_x
  ]

  var left_variable = variable;
  if(add_constant_0 != 0)
  {
    left_variable = '('+polynomial(variable,[add_constant_0,1])+')'
  }

  left_s = polynomial(left_variable,left_p)
  right_s = polynomial(variable,right_p)

  if(random(2) == 0) {
    var tmp = left_s;
    left_s = right_s;
    right_s = tmp;
  }

  return left_s + ' = ' + right_s
}

function generate() {
  $('#problems').html('')
  // new Date().toISOString().split('T')[0]

  var variables = ['a','b','c','x','y','z']
  var variable = variables[random(variables.length)]
  $('h1').html('Solve for ``'+variable+'`` and check.')
  for(var i=0;i<6;i++) {
    var problem
    if(random(2) == 0)
      problem = problem_undo(variable)
    else
      problem = problem_linear(variable)
    $('#problems').append('<li>``'+problem+'``')
  }
}

$(generate)
