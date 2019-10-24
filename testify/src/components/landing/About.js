import React from 'react'
import Ariana_Shackelford from '../../img/Beachprofile.jpg'
import Greg_cameron from '../../img/Greg_cameron.png'
import Jonathan_Ferrer from '../../img/Jonathan_Ferrer.png'
import Jordan_Miller from '../../img/Jordan_Miller.png'
import Raajn_Patel from '../../img/Raajn_Patel.png'

export default function About() {
    return (
        <>
        <section className="top">
            <div className="developer">
                <h3>Project Manager</h3>
                <img src={Jonathan_Ferrer} alt="Jonothan_Ferrer"/>
                <p>I'm sort of a softy, I couldn't shoot Bambi except with a camera. Steve wants reflections, so let's give him reflections. In this world, everything can be happy.
                    </p>
            </div>
        </section>
        <section className="middle">
            <div className="developer">
                <h3>UI</h3>
                <img src={Ariana_Shackelford} alt="Ariana_Shackelford"/>
                <p>I'm sort of a softy, I couldn't shoot Bambi except with a camera. Steve wants reflections, so let's give him reflections. In this world, everything can be happy.
                    </p>
            </div>
            <div className="developer">
                <h3>Front End</h3>
                <img src={Jordan_Miller} alt="Jordan_Miller"/>
                <p>I'm sort of a softy, I couldn't shoot Bambi except with a camera. Steve wants reflections, so let's give him reflections. In this world, everything can be happy.
                    </p>
            </div>
        </section>
        <section className="middle">
            <div className="developer">
                <h3>Front End</h3>
                <img src={Greg_cameron} alt="Greg_Cameron"/>
                <p>I'm sort of a softy, I couldn't shoot Bambi except with a camera. Steve wants reflections, so let's give him reflections. In this world, everything can be happy.
                    </p>
            </div>
            <div className="developer">
                <h3>Back End</h3>
                <img src={Raajn_Patel} alt="Raajn_Patel"/>
                <p>I'm sort of a softy, I couldn't shoot Bambi except with a camera. Steve wants reflections, so let's give him reflections. In this world, everything can be happy.
                    </p>
            </div>
        </section>
        
        <footer>
            {/* <div class='icons'>
                <img src="#" alt="#">  
                <img src="#" alt="#">
            </div> */}
            <p>Testify copyright 2019</p>
        </footer>
        </>
    )
}
