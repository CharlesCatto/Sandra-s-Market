import type React from "react";
import Particles from "react-tsparticles";
import { loadSnowPreset } from "tsparticles-preset-snow";
import type { Engine } from "tsparticles-engine"; // Importez le type Engine

const SnowEffect: React.FC = () => {
  const particlesInit = async (main: Engine) => {
    await loadSnowPreset(main); // Charge le preset "neige"
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        preset: "snow", // Utilise le preset "neige"
        background: {
          color: "transparent", // Fond transparent pour ne pas interférer avec votre design
        },
        particles: {
          number: {
            value: 400, // Nombre de flocons de neige
          },
          move: {
            direction: "bottom", // Les flocons tombent vers le bas
            enable: true,
            speed: 3, // Vitesse de chute
          },
          size: {
            value: 10, // Taille des flocons
            random: true, // Taille aléatoire
          },
          opacity: {
            value: 0.7, // Opacité des flocons
            random: true, // Opacité aléatoire
          },
        },
      }}
    />
  );
};

export default SnowEffect;
