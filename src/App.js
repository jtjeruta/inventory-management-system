import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SamplePage from './pages/SamplePage'

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<SamplePage />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
