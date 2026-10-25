/* Independently organised checklist using the official 2026 syllabus as reference.
   OC IDs and its 129-topic denominator are frozen; new branches have a separate manifest. */
const Catalog=(()=>{
const subjects=[{id:'physics',name:'Physics',symbol:'φ',description:'From first principles to connected systems.'},{id:'chemistry',name:'Chemistry',symbol:'C',description:'Physical, inorganic, and organic chemistry.'},{id:'mathematics',name:'Mathematics',symbol:'∑',description:'Structure, reasoning, and problem solving.'}];
const branches=[{id:'physics',subject:'physics',name:'Physics',short:'Physics'},{id:'organic',subject:'chemistry',name:'Organic Chemistry',short:'Organic'},{id:'physical',subject:'chemistry',name:'Physical Chemistry',short:'Physical'},{id:'inorganic',subject:'chemistry',name:'Inorganic Chemistry',short:'Inorganic'},{id:'mathematics',subject:'mathematics',name:'Mathematics',short:'Mathematics'}];
const spec=`physics|General|Measurement & experimental physics|Units and dimensional analysis;Significant figures and error propagation;Vernier callipers and screw gauge;Pendulum and elasticity experiments;Capillary rise and calorimetry experiments;Focal length and resonance column experiments;Ohm’s law, meter bridge and post office box
physics|Mechanics|Kinematics|Motion in one and two dimensions;Projectile motion;Relative velocity;Uniform circular motion
physics|Mechanics|Laws of motion|Newton’s laws and connected bodies;Accelerated frames;Static and kinetic friction
physics|Mechanics|Work, energy & power|Work by variable forces;Kinetic and potential energy;Conservation of mechanical energy;Power and constrained systems
physics|Mechanics|Momentum & collisions|Centre of mass and systems of particles;Impulse and momentum conservation;Elastic and inelastic collisions
physics|Mechanics|Rotational motion|Moment of inertia and axis theorems;Torque and angular momentum;Fixed-axis rigid-body dynamics;Rolling without slipping;Rigid-body equilibrium;Point-mass collisions with rigid bodies
physics|Mechanics|Oscillations|Linear and angular simple harmonic motion;Spring and pendulum systems;Damped and forced oscillations;Resonance
physics|Mechanics|Gravitation|Gravitational field and potential;Acceleration due to gravity;Kepler’s laws and satellite orbits;Escape velocity
physics|Mechanics|Elasticity & fluids|Hooke’s law and Young’s modulus;Bulk and rigidity moduli;Fluid pressure, Pascal’s law and buoyancy;Surface tension, drops and bubbles;Capillary rise and contact angle;Viscosity, Stokes’ law and terminal velocity;Continuity and Bernoulli’s theorem
physics|Mechanics|Waves & sound|Progressive longitudinal and transverse waves;Superposition and standing waves;Vibrating strings and air columns;Resonance and beats;Speed of sound in gases;Doppler effect in sound
physics|Thermal physics|Heat & thermodynamics|Thermal expansion;Calorimetry and latent heat;Conduction, convection and Newton’s cooling;Gas laws and specific heats;Isothermal and adiabatic processes;First law for ideal gases;Second law and Carnot engine;Blackbody radiation and Kirchhoff’s law;Wien’s and Stefan’s laws
physics|Electricity & magnetism|Electrostatics|Coulomb’s law and superposition;Electric field and potential;Dipoles and electrostatic energy;Flux and Gauss’s law;Fields of lines, sheets and shells
physics|Electricity & magnetism|Capacitance|Parallel-plate capacitors and dielectrics;Capacitor networks;Stored energy and charge redistribution
physics|Electricity & magnetism|Current electricity|Ohm’s law and resistivity;Resistor and cell networks;Kirchhoff’s laws;Joule heating
physics|Electricity & magnetism|Magnetic effects of current|Biot–Savart and Ampere’s laws;Fields of wires, coils and solenoids;Magnetic force on charges and wires;Magnetic moment and torque;Galvanometer, ammeter and voltmeter conversions
physics|Electricity & magnetism|Induction & circuits|Faraday’s and Lenz’s laws;Motional EMF;Self and mutual inductance;RC and LR transients;LC oscillations and series LCR;AC sources and resonance
physics|Electromagnetic waves|Spectrum & properties|Electromagnetic wave characteristics;Spectrum and practical uses
physics|Optics|Geometrical optics|Reflection and refraction;Total internal reflection;Prism deviation and dispersion;Spherical mirrors and thin lenses;Optical combinations and magnification
physics|Optics|Wave optics|Huygens’ principle;Young’s double-slit interference;Single-slit diffraction;Polarisation, Brewster’s law and Polaroids
physics|Modern physics|Atoms, nuclei & matter waves|Photoelectric effect;Hydrogen-like atoms and Bohr model;X-rays and Moseley’s law;de Broglie waves;Nuclear structure and binding energy;Radioactivity, half-life and mean life;Fission and fusion energy
physical|Foundations|Mole concept & stoichiometry|Atoms, molecules and chemical formulae;Balanced equations and reaction stoichiometry;Redox and neutralisation calculations;Concentration measures
physical|Foundations|Atomic structure|Bohr model and hydrogen spectrum;de Broglie relation and uncertainty;Quantum numbers and orbital shapes;Orbital energies and probability plots;Aufbau, Pauli and Hund rules
physical|States of matter|Gases & liquids|Gas laws and ideal gas equation;Nonideal gases and van der Waals equation;Molecular speeds and kinetic theory;Partial pressures and diffusion;Intermolecular interactions;Vapour pressure, surface tension and viscosity
physical|Energetics & equilibrium|Chemical thermodynamics|State functions and thermodynamic properties;Internal energy, heat and PV work;Enthalpy and heat capacity;Hess’s law and reaction enthalpies;Entropy and the second law;Gibbs energy, spontaneity and equilibrium
physical|Energetics & equilibrium|Chemical equilibrium|Mass action and reaction quotient;Kp and Kc;Gibbs energy and equilibrium constant;Le Chatelier’s principle
physical|Energetics & equilibrium|Ionic equilibrium|Brønsted and Lewis acids and bases;pH of acids and bases;Buffers and salt hydrolysis;Solubility product and common ion effect
physical|Electrochemistry & kinetics|Electrochemistry|Cells, electrodes and electrochemical series;Nernst equation and EMF;Electrochemical work and equilibrium;Faraday’s electrolysis laws;Conductivity and Kohlrausch’s law;Batteries, fuel cells and corrosion
physical|Electrochemistry & kinetics|Chemical kinetics|Reaction rate, order and molecularity;Zero- and first-order rate laws;Half-life and integrated kinetics;Arrhenius equation and activation energy;Homogeneous, heterogeneous and enzyme catalysis
physical|Condensed matter|Solid state|Crystal systems and unit cells;Cubic and hexagonal close packing;Coordination number, radius ratio and ionic solids;Point defects
physical|Condensed matter|Solutions|Henry’s and Raoult’s laws;Ideal solutions and vapour pressure;Colligative properties;van’t Hoff factor
physical|Condensed matter|Surface chemistry|Physisorption and chemisorption;Freundlich adsorption isotherm;Colloids and preparation;Emulsions, surfactants and micelles
inorganic|Foundations|Periodicity|Periodic table and electronic configuration;Atomic and ionic radii;Ionisation and electron gain enthalpy;Electronegativity, valence and oxidation states;Periodic trends in reactivity
inorganic|Foundations|Chemical bonding|Orbital overlap and covalent bonds;Hybridisation and molecular shapes;VSEPR theory;Homonuclear molecular orbital diagrams up to Ne2;Bond polarity and dipole moment;Hydrogen bonding
inorganic|Main group chemistry|Hydrogen|Isotopes, preparation and properties;Ionic, covalent and interstitial hydrides;Water and heavy water;Hydrogen peroxide;Hydrogen as fuel
inorganic|Main group chemistry|s-Block elements|Alkali and alkaline earth reactivity;Reducing behaviour and liquid ammonia;Oxides, hydroxides, halides and oxoacid salts;Anomalous lithium and beryllium;Sodium compounds;Calcium compounds
inorganic|Main group chemistry|p-Block elements|Group trends and anomalous second-period behaviour;Group 13 and boron compounds;Group 14, carbon and silicon compounds;Group 15, nitrogen and phosphorus compounds;Group 16, oxygen and sulphur compounds;Group 17, halogens and interhalogens;Group 18 and xenon compounds
inorganic|Transition chemistry|d- & f-Block elements|Oxidation states and electrode potentials;Alloys, interstitial compounds and catalysis;Chromium and manganese oxoanions;Lanthanoid and actinoid contraction;f-Block oxidation states
inorganic|Transition chemistry|Coordination compounds|Werner’s theory and nomenclature;Coordination isomerism;Hybridisation and geometry;Valence bond and crystal field models;Colour and magnetic properties;Ligands, spectrochemical series and stability;Metal carbonyls and applications
inorganic|Applied inorganic|Metallurgy|Ores and concentration;Thermodynamic extraction of iron, copper and zinc;Electrolytic extraction of aluminium;Cyanide extraction of silver and gold;Metal refining
inorganic|Applied inorganic|Qualitative analysis|Group I–V cation separation;Identification of specified cations;Nitrate, halide and carbonate tests;Sulphate, sulphide and bicarbonate tests
mathematics|Foundations|Sets, relations & functions|Set algebra and De Morgan’s laws;Cartesian products and relations;Equivalence relations;Domain, codomain and range;One-to-one, onto and inverse functions;Even, odd and special functions;Composition and operations on functions
mathematics|Algebra|Complex numbers|Complex arithmetic and conjugation;Modulus, principal argument and polar form;Triangle inequality;Cube roots of unity;Complex-plane geometry
mathematics|Algebra|Quadratic equations|Roots and coefficients;Formation of equations;Symmetric functions of roots;Fundamental theorem of algebra
mathematics|Algebra|Sequences & series|Arithmetic progressions and means;Geometric progressions and means;Finite and infinite sums;Sums of natural numbers, squares and cubes
mathematics|Algebra|Counting & binomial theorem|Logarithms and their properties;Permutations;Combinations;Binomial theorem for positive integral index;Binomial coefficients and identities
mathematics|Algebra|Matrices & determinants|Matrix algebra and transposes;Symmetric and skew-symmetric matrices;Determinants up to order three;Elementary row and column operations;Adjoint and inverse;Linear equations in two and three variables
mathematics|Probability & statistics|Probability|Sample spaces and events;Addition and multiplication rules;Conditional probability and independence;Total probability and Bayes’ theorem;Combinatorial probability
mathematics|Probability & statistics|Statistics|Mean, median and mode;Mean deviation, variance and standard deviation;Grouped frequency distributions;Random variables, expectation and variance
mathematics|Trigonometry|Trigonometric functions|Periodicity and graphs;Addition and subtraction identities;Multiple and submultiple angles;General solutions of equations;Principal inverse trigonometric functions
mathematics|Analytical geometry|Straight lines & triangles|Cartesian coordinates and section formula;Shift of origin;Line equations and intersections;Angles, distances and angle bisectors;Concurrency and triangle centres
mathematics|Analytical geometry|Circles|Circle equations and parametric form;Tangents, normals and chords;Circle-line intersections;Intersecting circles and families
mathematics|Analytical geometry|Conic sections|Parabola and its geometry;Ellipse and its geometry;Hyperbola and its geometry;Parametric forms, tangents and normals;Locus problems
mathematics|Analytical geometry|Three-dimensional geometry|Direction cosines and ratios;Lines and skew lines;Shortest distance between lines;Planes, distances and angles;Coplanarity
mathematics|Calculus|Limits & continuity|Limits and algebra of limits;L’Hospital’s rule;Continuity and composite functions;Intermediate value property
mathematics|Calculus|Differentiation|Standard derivatives and chain rule;Implicit differentiation;Second derivatives;Geometric interpretation of derivatives
mathematics|Calculus|Applications of derivatives|Tangents and normals;Increasing and decreasing functions;Maxima and minima;Rolle’s and Lagrange’s mean value theorems
mathematics|Calculus|Integral calculus|Standard indefinite integrals;Substitution and partial fractions;Integration by parts;Definite integrals as limits of sums;Definite integral properties and fundamental theorem;Areas bounded by curves
mathematics|Calculus|Differential equations|Formation of differential equations;Separation of variables;First-order homogeneous equations;First-order linear equations
mathematics|Vectors|Vector algebra|Vector addition and scalar multiplication;Dot and cross products;Scalar and vector triple products;Geometrical applications`;
const chapters=syllabus.map(c=>({id:c.id,name:c.name,unit:c.group,branchId:'organic',subject:'chemistry',topics:c.skills.map(s=>s.id),weight:c.weight}));
const topics=syllabus.flatMap((c,i)=>c.skills.map((s,j)=>({...s,chapterId:c.id,branchId:'organic',subject:'chemistry',legacyKey:i+':'+j})));
const serial={};
spec.split('\n').forEach(line=>{const [branchId,unit,name,list]=line.split('|');const n=serial[branchId]=(serial[branchId]||0)+1;const branch=branches.find(b=>b.id===branchId);const id=branchId+'-ch-'+String(n).padStart(2,'0');const items=list.split(';').map((name,j)=>({id:id+'-'+String(j+1).padStart(2,'0'),name,chapterId:id,branchId,subject:branch.subject,status:'Not assessed'}));chapters.push({id,name,unit,branchId,subject:branch.subject,topics:items.map(t=>t.id)});topics.push(...items)});
if(topics.filter(t=>t.branchId==='organic').length!==129)throw Error('Organic syllabus denominator changed.');
return {version:'pcm-2026-reference-v1',subjects,branches,chapters,topics,source:'https://jeeadv.ac.in/documents/jee-advanced-2026-syllabus.pdf'};
})();
if(typeof module!=='undefined')module.exports=Catalog;
