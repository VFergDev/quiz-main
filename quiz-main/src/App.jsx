import QuizView from './components/QuizView'
import questionBank from './constants'

function App() {

  return (
    <div className="App">
      <QuizView questions={questionBank} />
    </div>
  )
}

export default App
