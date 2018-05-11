import Shape from './shape'
class Board extends Shape{
  constructor(x, y, exists, context){
    super(x, y, 10, 10, exists)
    this.context = context
    this.color = 'white'
    this.width = 50
    this.height = 10
  }
  draw = () => {

  }
}
