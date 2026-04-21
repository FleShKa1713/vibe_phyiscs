import { create } from 'zustand';

const theoryData = {
  7: {
    1: {
      title: "Закон Архімеда",
      formula: "F_A = ρ_р · g · V_з",
      description: "На тіло, занурене в рідину або газ, діє виштовхувальна сила, яка дорівнює вазі рідини в об'ємі зануреної частини тіла. Якщо густина тіла менша за густину рідини (ρ_т < ρ_р), тіло плаває.",
    },
    2: {
      title: "Рівномірний прямолінійний рух",
      formula: "S = v · t",
      description: "Це рух, під час якого тіло за будь-які рівні інтервали часу здійснює однакові переміщення. Графік шляху від часу є прямою лінією, нахил якої залежить від швидкості.",
    },
    3: {
      title: "Правило моментів (Важіль)",
      formula: "F_1 · d_1 = F_2 · d_2",
      description: "Важіль перебуває в рівновазі, якщо момент сили, що обертає його за годинниковою стрілкою, дорівнює моменту сили, що обертає його проти годинникової стрілки.",
    },
    4: {
      title: "Гідростатичний тиск (Закон Паскаля)",
      formula: "P = ρ · g · h",
      description: "Тиск, створюваний рідиною, залежить від її густини та висоти стовпа. Чим глибше, тим більший тиск, і з тим більшою швидкістю витікає рідина з отвору.",
    }
  },
  8: {
    1: {
      title: "Закон Ома для ділянки кола",
      formula: "I = U / R",
      description: "Сила струму (I) на ділянці електричного кола прямо пропорційна напрузі (U) на її кінцях і обернено пропорційна електричному опору (R) цієї ділянки.",
    },
    2: {
      title: "Теплові явища та агрегатні стани",
      formula: "Q = c·m·Δt | Q = λ·m | Q = L·m",
      description: "Під час нагрівання температура зростає. Однак під час плавлення льоду або кипіння води вся підведена теплота (Q) витрачається на руйнування кристалічної ґратки або розрив молекулярних зв'язків, тому температура залишається незмінною.",
    },
    3: {
      title: "Теплопровідність",
      formula: "Q / t = k · A · ΔT / L",
      description: "Теплопровідність — це процес передачі внутрішньої енергії від більш нагрітих частин тіла до менш нагрітих через хаотичний рух мікрочастинок (атомів, молекул).",
    },
    4: {
      title: "Магнітне поле",
      formula: "B = μ_0 · I / (2πr)",
      description: "Навколо постійних магнітів та провідників зі струмом існує магнітне поле. Силові лінії магнітного поля завжди замкнені і виходять з північного полюса, входячи в південний.",
    }
  },
  9: {
    1: {
      title: "Закон заломлення світла (Закон Снелліуса)",
      formula: "n_1 · sin(α) = n_2 · sin(γ)",
      description: "При переході світла з одного середовища в інше промінь змінює напрямок. Якщо світло переходить у більш оптично густе середовище (n2 > n1), кут заломлення менший за кут падіння.",
    },
    2: {
      title: "Механічні хвилі",
      formula: "v = λ · ν",
      description: "Хвиля переносить енергію без перенесення самої речовини. Частота (ν) вказує на кількість коливань за секунду, а амплітуда (A) визначає максимальне відхилення від положення рівноваги.",
    },
    3: {
      title: "Закони відбивання світла",
      formula: "α = β",
      description: "Кут падіння дорівнює куту відбивання. Для плоского дзеркала зображення пряме та уявне. Увігнуті дзеркала можуть збирати промені у фокусі.",
    },
    4: {
      title: "Ефект Доплера",
      formula: "ν' = ν · (v_зв / (v_зв ± v_дж))",
      description: "Зміна частоти і довжини хвилі, що сприймається спостерігачем, внаслідок руху джерела хвиль. Попереду джерела хвилі стискаються (вищий тон), а позаду — розтягуються.",
    }
  },
  10: {
    1: {
      title: "Другий закон Ньютона та Гравітація",
      formula: "F = m · a | F_т = m · g",
      description: "Прискорення (a), якого набуває тіло, прямо пропорційне рівнодійній всіх сил (F) і обернено пропорційне масі тіла (m). Гравітація змушує всі тіла падати з однаковим прискоренням вільного падіння.",
    },
    2: {
      title: "Ідеальний газ (МКТ)",
      formula: "P = n · k · T | P·V = const",
      description: "Тиск газу (P) створюється ударами молекул об стінки посудини. Зі збільшенням температури (T) швидкість молекул зростає, отже зростає і тиск. При зменшенні об'єму (V) кількість ударів збільшується.",
    },
    3: {
      title: "Балістичний рух",
      formula: "y(x) = x·tan(α) - (g·x^2) / (2v_0^2·cos^2(α))",
      description: "Тіло, кинуте під кутом до горизонту, рухається по параболі (без опору повітря). Рух можна розкласти на рівномірний по горизонталі та рівноприскорений по вертикалі.",
    },
    4: {
      title: "Робота газу (Ізопроцеси)",
      formula: "A = P · ΔV",
      description: "Газ виконує роботу при зміні свого об'єму. На P-V діаграмі робота дорівнює площі під графіком процесу. При ізотермічному стисненні тиск зростає обернено пропорційно об'єму.",
    }
  },
  11: {
    1: {
      title: "Сила Лоренца",
      formula: "F_л = q · v · B · sin(α)",
      description: "Сила, що діє на рухомий електричний заряд (q) з боку магнітного поля (B). Якщо заряд рухається перпендикулярно до ліній поля, він починає рухатися по колу, оскільки сила діє як доцентрова.",
    },
    2: {
      title: "Закон радіоактивного розпаду",
      formula: "N = N_0 · 2^{-t/T}",
      description: "Радіоактивність — це самовільне перетворення нестабільних ядер одних атомів на ядра інших з випромінюванням частинок. Період напіврозпаду (T) — це час, за який розпадається рівно половина ядер.",
    },
    3: {
      title: "Електромагнітна індукція",
      formula: "ε = -ΔΦ / Δt",
      description: "Закон Фарадея: змінне магнітне поле створює вихрове електричне поле. При русі магніту крізь котушку виникає індукційний струм.",
    },
    4: {
      title: "Фотоефект",
      formula: "hν = A_{вих} + (m·v^2)/2",
      description: "Явище виривання електронів з металу під дією світла. Фотоефект має червону межу — мінімальну енергію фотона, необхідну для виривання електрона.",
    }
  }
};

const useStore = create((set) => ({
  activeGrade: 7, // 7, 8, 9, 10, 11
  setActiveGrade: (grade) => set({ activeGrade: grade, activeExperiment: 1 }),
  
  activeExperiment: 1, // 1 або 2
  setActiveExperiment: (exp) => set({ activeExperiment: exp }),

  // Global Toggles
  showVectors: true,
  toggleVectors: () => set((state) => ({ showVectors: !state.showVectors })),
  
  // Simulation Control
  resetTrigger: 0,
  triggerReset: () => set((state) => ({ resetTrigger: state.resetTrigger + 1 })),
  
  theoryOpen: false,
  toggleTheory: () => set((state) => ({ theoryOpen: !state.theoryOpen })),
  theoryData: theoryData,

  // 7 Клас параметри
  grade7Params: {
    archimedesLiquidDensity: 1000, 
    archimedesObjectDensity: 500,
    archimedesObjectSize: 100,
    kinematicsVelocity: 5,
    kinematicsCarSize: 1.0,
    leverLeftMass: 5, // маса вантажу зліва (кг)
    leverRightMass: 5, // маса вантажу справа (кг)
    leverLeftPos: 3, // позиція на лівому плечі
    leverRightPos: 3, // позиція на правому плечі
    leverFulcrumOffset: 0, // Зсув точки опори
    tankWaterLevel: 100, // Рівень води у баці
  },
  setGrade7Params: (params) => set((state) => ({ 
    grade7Params: { ...state.grade7Params, ...params } 
  })),

  // 8 Клас параметри
  grade8Params: {
    circuitVoltage: 9,
    circuitResistance: 10,
    thermalEnergy: 0,
    heatCapacity: 4200,
    heatSourceTemp: 0, // 0 - 100 для теплопровідності
    thermalMaterial: 'copper', // 'copper', 'iron', 'glass', 'wood'
    magnetCount: 1, // Кількість магнітів
    magnetAngle: 0, // Кут обертання магніту (для першого)
  },
  setGrade8Params: (params) => set((state) => ({ 
    grade8Params: { ...state.grade8Params, ...params } 
  })),

  // 9 Клас параметри
  grade9Params: {
    lensType: 'convex',
    lensRefractiveIndex: 1.5,
    laserColor: '#ef4444',
    waveFrequency: 2,
    waveAmplitude: 1,
    mirrorType: 'flat', // flat, convex, concave
    dopplerSpeed: 0, // Швидкість джерела звуку (відносно швидкості хвилі)
  },
  setGrade9Params: (params) => set((state) => ({ 
    grade9Params: { ...state.grade9Params, ...params } 
  })),

  // 10 Клас параметри
  grade10Params: {
    gravity: 9.8,
    restitution: 0.8,
    friction: 0.05,
    gasTemperature: 300,
    gasVolume: 100,
    particleMass: 1,
    cannonAngle: 45, // Кут пострілу
    cannonSpeed: 15, // Початкова швидкість
    airResistance: 0, // Опір повітря
    gasPistonVolume: 100, // Для P-V діаграми
  },
  setGrade10Params: (params) => set((state) => ({ 
    grade10Params: { ...state.grade10Params, ...params } 
  })),

  // 11 Клас параметри
  grade11Params: {
    magneticFieldZ: 0.05,
    particleVelocity: 5,
    decayProbability: 0.02,
    magnetSpeed: 0, // Швидкість руху магніту крізь котушку
    inductionCoilTurns: 500, // Кількість витків котушки
    photonWavelength: 500, // Довжина хвилі (нм) для фотоефекту
    workFunction: 2.0, // Робота виходу (еВ)
  },
  setGrade11Params: (params) => set((state) => ({ 
    grade11Params: { ...state.grade11Params, ...params } 
  })),

  // AI Tutor State
  aiTutorOpen: false,
  toggleAITutor: () => set((state) => ({ aiTutorOpen: !state.aiTutorOpen })),
  aiMessages: [
    { role: 'ai', content: "Привіт! Я твій штучний інтелект-вчитель фізики. Запитуй мене про все, що бачиш на екрані!" }
  ],
  addAiMessage: (message) => set((state) => ({ 
    aiMessages: [...state.aiMessages, message] 
  })),
  clearAiMessages: () => set({ 
    aiMessages: [
      { role: 'ai', content: "Привіт! Я твій штучний інтелект-вчитель фізики. Запитуй мене про все, що бачиш на екрані!" }
    ] 
  }),
}));

export default useStore;
