const translations = {
  uk: {
    grades: {
      6: 'ZS 6 Клас',
      7: 'ZS 7 Клас',
      8: 'ZS 8 Клас',
      9: 'ZS 9 Клас',
      10: 'SS 1 Курс',
      11: 'SS 2 Курс'
    },
    expNames: {
      6: { 1: 'Будова речовини', 2: 'Густина та Об\'єм', 3: 'Магнітні властивості' },
      7: { 1: 'Закон Архімеда', 2: 'Рівномірний рух', 3: 'Важіль', 4: 'Закон Паскаля' },
      8: { 1: 'Електричне коло', 2: 'Агрегатні стани', 3: 'Теплопровідність', 4: 'Магнітне поле' },
      9: { 1: 'Оптика (Лінзи)', 2: 'Хвилі', 3: 'Відбивання', 4: 'Ефект Доплера' },
      10: { 1: 'Динаміка', 2: 'Ідеальний газ', 3: 'Балістика', 4: 'P-V Діаграма' },
      11: { 1: 'Сила Лоренца', 2: 'Радіоактивність', 3: 'Індукція Фарадея', 4: 'Фотоефект' },
    },

    expHints: {
      6: {
        1: '\u{1F52C} Змінюйте температуру, щоб побачити як поводяться молекули у різних агрегатних станах.',
        2: '\u{1F4CF} Обирайте предмети та кидайте їх у мензурку. Зверніть увагу на зміну рівня води.',
        3: '\u{1F9F2} Перетягуйте магніти та спостерігайте за поведінкою залізних ошурок.',
      },
      7: { 
        1: '🖱 Перетягніть брусок у воду. Змінюйте густину тіла та рідини.', 
        2: '🚗 Спостерігайте за графіком S(t). Змінюйте швидкість під час руху!',
        3: '⚖️ Додавайте тягарці на ліве та праве плече важеля. Слідкуйте за балансом моментів сил.',
        4: '💧 Чим глибше отвір, тим з більшою швидкістю вилітає струмінь (Закон Торрічеллі).'
      },
      8: { 
        1: '⚡ Змінюйте напругу та опір. Перетягуйте елементи.', 
        2: '🔥 Рухайте повзунок енергії — лід розтане, вода закипить!',
        3: '🔥 Збільшуйте температуру зліва і спостерігайте за поширенням кінетичної енергії атомів.',
        4: '🧲 Обертайте магніт і спостерігайте, як залізні ошурки шикуються вздовж ліній магнітного поля.'
      },
      9: { 
        1: '🔬 Перетягуйте лінзу та лазер. Обертайте за край. Вибирайте тип лінзи.', 
        2: '🌊 Перетягуйте генератор. Змінюйте частоту та амплітуду.',
        3: '🪞 Перемикайте типи дзеркал (плоске, опукле, увігнуте). Знайдіть фокус увігнутого дзеркала.',
        4: '🔊 Рухайте джерело звуку. Подолайте звуковий бар\'єр для утворення конуса Маха!'
      },
      10: { 
        1: '🏀 Перетягуйте кульки. Змінюйте гравітацію та пружність.', 
        2: '🌡 Змінюйте температуру та об\'єм — спостерігайте за тиском.',
        3: '🎯 Налаштуйте кут та початкову швидкість гармати. Увімкніть опір повітря для реалістичної траєкторії.',
        4: '📈 Змінюйте об\'єм газу під поршнем і спостерігайте за малюванням ізотерми на P-V діаграмі.'
      },
      11: { 
        1: '🧲 Перетягуйте випромінювач. Змінюйте магнітне поле.', 
        2: '☢ Змінюйте ймовірність розпаду ядер.',
        3: '🧲 Рухайте магніт крізь котушку дроту. Спостерігайте за індукційним струмом на амперметрі.',
        4: '💡 Змінюйте колір (енергію) світла. Червоне світло не вибиває електрони, а ультрафіолетове — легко!'
      },
    },
    ui: {
      theoryTitle: 'Довідник Фізика',
      wikiLink: 'Детальніше на Вікіпедії',
      chooseExp: 'Оберіть дослід для перегляду теорії.',
      reset: 'Скинути',
      vectors: 'Вектори',
      aiGreeting: "Привіт! Я твій штучний інтелект-вчитель фізики. Запитуй мене про все, що бачиш на екрані!",
      aiPlaceholder: "Запитай щось про цей дослід...",
      densityBody: "ρ тіла",
      densityLiquid: "ρ рідини",
      submersion: "Занурення",
      sinks: "ТОНЕ",
      floats: "ПЛАВАЄ",
      velocity: "швидкість",
      pathGraph: "Графік шляху S(t)",
      time: "час",
      distance: "шлях",
      waterLevel: "Рівень води",
      leftMoment: "Лівий момент",
      rightMoment: "Правий момент",
      equilibrium: "РІВНОВАГА",
      noEquilibrium: "НЕМАЄ РІВНОВАГИ",
      params: "Параметри",
      densityLiq: "Густина рідини",
      densityObj: "Густина тіла",
      objSize: "Розмір тіла",
      velocityLabel: "Швидкість",
      carSize: "Розмір машинки",
      massLeft: "Маса лівого тягарця",
      massRight: "Маса правого тягарця",
      posLeft: "Позиція лівого (L)",
      posRight: "Позиція правого (R)",
      fulcrumOffset: "Зсув опори (Δx)",
      voltage: "Напруга (В)",
      resistance: "Опір (Ом)",
      addEnergy: "Додати енергію (Тепло)",
      heatCap: "Питома теплоємність",
      sourceTemp: "Температура джерела (°C)",
      material: "Матеріал стрижня",
      magnets: "Кількість магнітів",
      magnetAngle: "Кут повороту магніту (°)",
      optElement: "Тип оптичного елемента",
      refrIndex: "Показник заломлення",
      laserColor: "Колір лазера",
      frequency: "Частота хвилі",
      amplitude: "Амплітуда",
      mirrorType: "Тип дзеркала",
      sourceSpeed: "Швидкість джерела",
      soundSpeed: "Швидкість звуку",
      gravity: "Гравітація",
      elasticity: "Пружність",
      temperature: "Температура Газу (K)",
      volume: "Об'єм камери",
      particleMass: "Маса частинок (у.о.)",
      cannonAngle: "Кут гармати (°)",
      cannonSpeed: "Початкова швидкість",
      airRes: "Опір повітря (k)",
      pistonVol: "Об'єм газу (V)",
      magField: "Магнітне поле (B)",
      decayProb: "Ймовірність розпаду",
      coilTurns: "Кількість витків котушки",
      wavelength: "Довжина хвилі (λ)",
      workFunc: "Робота виходу (A)",
      hideVectors: "Сховати вектори",
      showVectors: "Показати вектори",
      copper: "Мідь",
      iron: "Залізо",
      glass: "Скло",
      wood: "Дерево",
      convex: "Випукла лінза (Збиральна)",
      concave: "Увігнута лінза (Розсіювальна)",
      prism: "Прямокутна призма",
      flatMirror: "Плоске дзеркало",
      convexMirror: "Опукле дзеркало",
      concaveMirror: "Увігнуте дзеркало",
    },
    landing: {
      heroTitle: "Інтерактивна Фізика",
      heroSubtitle: "Досліджуй закони всесвіту через захоплюючі симуляції. Від Архімеда до квантової фізики — все в одному місці.",
      startBtn: "Розпочати навчання",
      gradesTitle: "Оберіть свій рівень",
      zsTitle: "Základní škola",
      ssTitle: "Střední škola",
      grade6Desc: "Будова речовини, густина та магніти.",
      grade7Desc: "Механіка, рух та тиск у рідинах.",
      grade8Desc: "Електрика, теплота та магніти.",
      grade9Desc: "Світло, хвилі та оптика.",
      grade10Desc: "Динаміка та молекулярна фізика.",
      grade11Desc: "Атомна фізика та індукція.",
      footerText: "Створено для майбутніх вчених",
      welcome: "Вітаємо у Physics Playground!"
    }
  },

  cs: {
    grades: {
      6: 'ZŠ 6. Třída',
      7: 'ZŠ 7. Třída',
      8: 'ZŠ 8. Třída',
      9: 'ZŠ 9. Třída',
      10: 'SŠ 1. Ročník',
      11: 'SŠ 2. Ročník'
    },
    expNames: {
      6: { 1: 'Stavba látek', 2: 'Hustota a objem', 3: 'Magnetické vlastnosti' },
      7: { 1: 'Archimedův zákon', 2: 'Rovnoměrný pohyb', 3: 'Páka', 4: 'Pascalův zákon' },
      8: { 1: 'Elektrický obvod', 2: 'Skupenství látek', 3: 'Tepelná vodivost', 4: 'Magnetické pole' },
      9: { 1: 'Optika (Čočky)', 2: 'Vlny', 3: 'Odraz', 4: 'Dopplerův jev' },
      10: { 1: 'Dynamika', 2: 'Ideální plyn', 3: 'Balistika', 4: 'P-V Diagram' },
      11: { 1: 'Lorentzova síla', 2: 'Radioaktivita', 3: 'Faradayova indukce', 4: 'Fotoelektrický jev' },
    },
    expHints: {
      6: {
        1: '🔬 Měňte teplotu a sledujte chování molekul v různých skupenstvích.',
        2: '📏 Vyberte předměty a vhoďte je do odměrného válce. Sledujte změnu hladiny vody.',
        3: '🧲 Přetahujte magnety a sledujte chování železných pilin.',
      },
      7: { 
        1: '🖱 Přetáhněte kvádr do vody. Měňte hustotu tělesa a kapaliny.', 
        2: '🚗 Sledujte graf S(t). Měňte rychlost během pohybu!',
        3: '⚖️ Přidávejte závaží na levé a pravé rameno páky. Sledujte rovnováhu momentů sil.',
        4: '💧 Čím hlubší je otvor, tím vyšší rychlostí vytéká proud (Torricelliho zákon).'
      },
      8: { 
        1: '⚡ Měňte napětí a odpor. Přetahujte prvky.', 
        2: '🔥 Posouvejte posuvník energie — led roztaje, voda začne vřít!',
        3: '🔥 Zvyšte teplotu vlevo a sledujte šíření kinetické energie atomů.',
        4: '🧲 Otáčejte magnetem a sledujte, jak se železné piliny řadí podél siločar magnetického pole.'
      },
      9: { 
        1: '🔬 Přetahujte čočku a laser. Otáčejte za okraj. Vyberte typ čočky.', 
        2: '🌊 Přetahujte generátor. Měňte frekvenci a amplitudu.',
        3: '🪞 Přepínejte typy zrcadel (rovinné, vypuklé, duté). Najděte ohnisko dutého zrcadla.',
        4: '🔊 Pohybujte zdrojem zvuku. Překonejte zvukovou bariéru pro vytvoření Machova kužele!'
      },
      10: { 
        1: '🏀 Přetahujte kuličky. Měňte gravitaci a pružnost.', 
        2: '🌡 Měňte teplotu a objem — sledujte tlak.',
        3: '🎯 Nastavte úhel a počáteční rychlost děla. Zapněte odpor vzduchu pro realistickou trajektorii.',
        4: '📈 Měňte objem plynu pod pístem a sledujte vykreslování izotermy na P-V diagramu.'
      },
      11: { 
        1: '🧲 Přetahujte zářič. Měňte magnetické pole.', 
        2: '☢ Měňte pravděpodobnost rozpadu jader.',
        3: '🧲 Pohybujte magnetem skrz cívku drátu. Sledujte indukční proud na ampérmetru.',
        4: '💡 Měňte barvu (energii) světla. Červené světlo nevyrazí elektrony, ale ultrafialové — snadno!'
      },
    },
    ui: {
      theoryTitle: 'Fyzikální příručka',
      wikiLink: 'Více na Wikipedii',
      chooseExp: 'Vyberte pokus pro zobrazení teorie.',
      reset: 'Resetovat',
      vectors: 'Vektory',
      aiGreeting: "Ahoj! Jsem tvůj AI učitel fyziky. Ptej se mě na cokoliv, co vidíš na obrazovce!",
      aiPlaceholder: "Zeptej se na něco o tomto pokusu...",
      densityBody: "ρ tělesa",
      densityLiquid: "ρ kapaliny",
      submersion: "Ponoření",
      sinks: "TONE",
      floats: "PLAVE",
      velocity: "rychlost",
      pathGraph: "Graf dráhy S(t)",
      time: "čas",
      distance: "dráha",
      waterLevel: "Hladina vody",
      leftMoment: "Levý moment",
      rightMoment: "Pravý moment",
      equilibrium: "ROVNOVÁHA",
      noEquilibrium: "NENÍ ROVNOVÁHA",
      params: "Parametry",
      densityLiq: "Hustota kapaliny",
      densityObj: "Hustota tělesa",
      objSize: "Velikost tělesa",
      velocityLabel: "Rychlost",
      carSize: "Velikost auta",
      massLeft: "Hmotnost levého závaží",
      massRight: "Hmotnost pravého závaží",
      posLeft: "Pozice levého (L)",
      posRight: "Pozice pravého (R)",
      fulcrumOffset: "Posun opory (Δx)",
      voltage: "Napětí (V)",
      resistance: "Odpor (Ω)",
      addEnergy: "Přidat energii (Teplo)",
      heatCap: "Měrná tepelná kapacita",
      sourceTemp: "Teplota zdroje (°C)",
      material: "Materiál tyče",
      magnets: "Počet magnetů",
      magnetAngle: "Úhel natočení magnetu (°)",
      optElement: "Typ optického prvku",
      refrIndex: "Index lomu",
      laserColor: "Barva laseru",
      frequency: "Frekvence vlnění",
      amplitude: "Amplituda",
      mirrorType: "Typ zrcadla",
      sourceSpeed: "Rychlost zdroje",
      soundSpeed: "Rychlost zvuku",
      gravity: "Gravitace",
      elasticity: "Pružnost",
      temperature: "Teplota plynu (K)",
      volume: "Objem komory",
      particleMass: "Hmotnost částic",
      cannonAngle: "Úhel děla (°)",
      cannonSpeed: "Počáteční rychlost",
      airRes: "Odpor vzduchu (k)",
      pistonVol: "Objem plynu (V)",
      magField: "Magnetické pole (B)",
      decayProb: "Pravděpodobnost rozpadu",
      coilTurns: "Počet závitů cívky",
      wavelength: "Vlnová délka (λ)",
      workFunc: "Výstupní práce (A)",
      hideVectors: "Skrýt vektory",
      showVectors: "Zobrazit vektory",
      copper: "Měď",
      iron: "Železo",
      glass: "Sklo",
      wood: "Dřevo",
      convex: "Spojná čočka",
      concave: "Rozptylná čočka",
      prism: "Pravoúhlý hranol",
      flatMirror: "Rovinné zrcadlo",
      convexMirror: "Vypuklé zrcadlo",
      concaveMirror: "Duté zrcadlo",
    },
    landing: {
      heroTitle: "Interaktivní Fyzika",
      heroSubtitle: "Objevujte zákony vesmíru prostřednictvím fascinujících simulací. Od Archimeda po kvantovou fyziku — vše na jednom místě.",
      startBtn: "Začít se učit",
      gradesTitle: "Vyberte si svou úroveň",
      zsTitle: "Základní škola",
      ssTitle: "Střední škola",
      grade6Desc: "Stavba látek, hustota a magnety.",
      grade7Desc: "Mechanika, pohyb a tlak v kapalinách.",
      grade8Desc: "Elektřina, teplo a magnety.",
      grade9Desc: "Světlo, vlny a optika.",
      grade10Desc: "Dynamika a molekulární fyzika.",
      grade11Desc: "Atomová fyzika a indukce.",
      footerText: "Vytvořeno pro budoucí vědce",
      welcome: "Vítejte ve Physics Playground!"
    }
  }
};


export const theoryContent = {
  uk: {
    6: {
      1: {
        title: "Будова речовини (Агрегатні стани)",
        formulas: [
          { name: "Кінетична енергія молекули", expr: "E_k = (3/2) · k · T" }
        ],
        description: "Речовина складається з молекул і атомів, що знаходяться у постійному русі. У твердому тілі частинки розташовані впорядковано (кристалічна решітка) і лише коливаються. У рідині частинки вільно переміщуються, але тримаються близько одна до одної. У газі частинки рухаються хаотично з великою швидкістю, заповнюючи весь об'єм. Температура — це міра середньої кінетичної енергії частинок. Броунівський рух — це видимий результат ударів дрібних молекул по більшій частинці.",
        wiki: "https://uk.wikipedia.org/wiki/Агрегатний_стан_речовини"
      },
      2: {
        title: "Густина та Об'єм",
        formulas: [
          { name: "Густина", expr: "ρ = m / V" },
          { name: "Об'єм через витіснення", expr: "V_тіла = V₂ - V₁" }
        ],
        description: "Густина — це фізична величина, що показує, яка маса речовини міститься в одиниці об'єму. Для вимірювання об'єму тіла неправильної форми використовують метод витіснення: занурюють тіло у воду і вимірюють різницю рівнів. Знаючи масу (з терезів) та об'єм, можна обчислити густину.",
        wiki: "https://uk.wikipedia.org/wiki/Густина"
      },
      3: {
        title: "Магнітні властивості",
        formulas: [
          { name: "Взаємодія полюсів", expr: "Однойменні полюси відштовхуються, різнойменні — притягуються" }
        ],
        description: "Кожен магніт має два полюси: північний (N) та південний (S). Навколо магніту існує магнітне поле, яке можна візуалізувати за допомогою залізних ошурок. Ошурки вишикуються вздовж силових ліній магнітного поля, які виходять з північного полюса і входять у південний.",
        wiki: "https://uk.wikipedia.org/wiki/Магнітне_поле"
      }
    },
    7: {
      1: {
        title: "Закон Архімеда",
        formulas: [
          { name: "Виштовхувальна сила", expr: "F_A = ρ_р · g · V_зан" },
          { name: "Умова плавання", expr: "ρ_тіла < ρ_рідини → тіло плаває" }
        ],
        description: "Тіло, занурене в рідину, зазнає дії виштовхувальної сили, яка дорівнює вазі витісненої рідини. Якщо F_A > mg — тіло спливає, якщо F_A < mg — тоне.",
        wiki: "https://uk.wikipedia.org/wiki/Закон_Архімеда"
      },
      2: {
        title: "Рівномірний прямолінійний рух",
        formulas: [
          { name: "Шлях", expr: "S = v · t" },
          { name: "Швидкість", expr: "v = S / t" }
        ],
        description: "Рух, при якому тіло за рівні проміжки часу проходить однакові відстані. Графік S(t) — пряма лінія, нахил якої дорівнює швидкості.",
        wiki: "https://uk.wikipedia.org/wiki/Рівномірний_прямолінійний_рух"
      },
      3: {
        title: "Правило моментів (Важіль)",
        formulas: [
          { name: "Правило моментів", expr: "F₁ · d₁ = F₂ · d₂" },
          { name: "Момент сили", expr: "M = F · d" }
        ],
        description: "Важіль перебуває в рівновазі, якщо момент сили, що обертає його за годинниковою стрілкою, дорівнює моменту сили, що обертає його проти годинникової стрілки.",
        wiki: "https://uk.wikipedia.org/wiki/Важіль"
      },
      4: {
        title: "Гідростатичний тиск",
        formulas: [
          { name: "Гідростатичний тиск", expr: "P = ρ · g · h" }
        ],
        description: "Тиск, створюваний рідиною, залежить від її густини та висоти стовпа. Чим глибше, тим більший тиск.",
        wiki: "https://uk.wikipedia.org/wiki/Закон_Паскаля"
      }
    },
    8: {
        1: {
          title: "Закон Ома",
          formulas: [
            { name: "Закон Ома", expr: "I = U / R" }
          ],
          description: "Сила струму прямо пропорційна напрузі та обернено пропорційна опору.",
          wiki: "https://uk.wikipedia.org/wiki/Закон_Ома"
        },
        2: {
          title: "Агрегатні стани",
          formulas: [
            { name: "Нагрівання", expr: "Q = c · m · Δt" }
          ],
          description: "Під час плавлення та кипіння вся підведена теплота йде на руйнування зв'язків між молекулами.",
          wiki: "https://uk.wikipedia.org/wiki/Агрегатний_стан_речовини"
        },
        3: {
          title: "Теплопровідність",
          formulas: [
            { name: "Закон Фур'є", expr: "Q / t = k · A · ΔT / L" }
          ],
          description: "Процес передачі внутрішньої енергії від більш нагрітих частин тіла до менш нагрітих.",
          wiki: "https://uk.wikipedia.org/wiki/Теплопровідність"
        },
        4: {
          title: "Магнітне поле",
          formulas: [
            { name: "Магнітна індукція", expr: "B = μ₀ · I / (2πr)" }
          ],
          description: "Навколо постійних магнітів та провідників зі струмом існує магнітне поле.",
          wiki: "https://uk.wikipedia.org/wiki/Магнітне_поле"
        }
    },
    9: {
        1: {
          title: "Заломлення світла",
          formulas: [
            { name: "Закон Снелліуса", expr: "n₁ · sin α = n₂ · sin β" }
          ],
          description: "Випукла лінза збирає паралельні промені у фокусі. Увігнута — розсіює.",
          wiki: "https://uk.wikipedia.org/wiki/Закон_Снелліуса"
        },
        2: {
          title: "Механічні хвилі",
          formulas: [
            { name: "Швидкість хвилі", expr: "v = λ · ν" }
          ],
          description: "Хвиля переносить енергію без перенесення речовини.",
          wiki: "https://uk.wikipedia.org/wiki/Механічна_хвиля"
        },
        3: {
          title: "Відбивання світла",
          formulas: [
            { name: "Закон відбивання", expr: "α = β" }
          ],
          description: "Кут падіння дорівнює куту відбивання.",
          wiki: "https://uk.wikipedia.org/wiki/Відбиття_світла"
        },
        4: {
          title: "Ефект Доплера",
          formulas: [
            { name: "Зміна частоти", expr: "ν' = ν · (v / (v ± v_дж))" }
          ],
          description: "Зміна частоти і довжини хвилі внаслідок руху джерела.",
          wiki: "https://uk.wikipedia.org/wiki/Ефект_Доплера"
        }
    },
    10: {
        1: {
          title: "Закони Ньютона",
          formulas: [
            { name: "Другий закон Ньютона", expr: "F = m · a" }
          ],
          description: "Прискорення тіла прямо пропорційне силі і обернено пропорційне масі.",
          wiki: "https://uk.wikipedia.org/wiki/Закони_Ньютона"
        },
        2: {
          title: "Ідеальний газ",
          formulas: [
            { name: "Рівняння стану", expr: "PV = νRT" }
          ],
          description: "Тиск створюється ударами молекул об стінки.",
          wiki: "https://uk.wikipedia.org/wiki/Молекулярно-кінетична_теорія"
        },
        3: {
          title: "Балістика",
          formulas: [
            { name: "Рівняння траєкторії", expr: "y(x) = x·tanα - (gx²) / (2v₀²cos²α)" }
          ],
          description: "Тіло, кинуте під кутом до горизонту, рухається по параболі.",
          wiki: "https://uk.wikipedia.org/wiki/Балістика"
        },
        4: {
          title: "Робота газу",
          formulas: [
            { name: "Робота газу", expr: "A = P · ΔV" }
          ],
          description: "Газ виконує роботу при зміні свого об'єму.",
          wiki: "https://uk.wikipedia.org/wiki/Ізотермічний_процес"
        }
    },
    11: {
        1: {
          title: "Сила Лоренца",
          formulas: [
            { name: "Сила Лоренца", expr: "F = qvB·sinα" }
          ],
          description: "Магнітне поле відхиляє заряджені частинки.",
          wiki: "https://uk.wikipedia.org/wiki/Сила_Лоренца"
        },
        2: {
          title: "Радіоактивний розпад",
          formulas: [
            { name: "Закон розпаду", expr: "N(t) = N₀ · 2^(−t/T½)" }
          ],
          description: "За один період напіврозпаду розпадається рівно половина ядер.",
          wiki: "https://uk.wikipedia.org/wiki/Радіоактивний_розпад"
        },
        3: {
          title: "Електромагнітна індукція",
          formulas: [
            { name: "Закон Фарадея", expr: "ε = -ΔΦ / Δt" }
          ],
          description: "Змінне магнітне поле створює вихрове електричне поле.",
          wiki: "https://uk.wikipedia.org/wiki/Електромагнітна_індукція"
        },
        4: {
          title: "Фотоефект",
          formulas: [
            { name: "Рівняння Ейнштейна", expr: "hν = A_вих + (m·v²)/2" }
          ],
          description: "Явище виривання електронів з металу під дією світла.",
          wiki: "https://uk.wikipedia.org/wiki/Фотоефект"
        }
    }
  },
  cs: {
    6: {
      1: {
        title: "Stavba látek (Skupenství)",
        formulas: [
          { name: "Kinetická energie molekuly", expr: "E_k = (3/2) · k · T" }
        ],
        description: "Látky se skládají z molekul a atomů v neustálém pohybu. V pevné látce jsou částice uspořádány v krystalové mřížce a pouze kmitají. V kapalině se volně pohybují, ale drží blízko sebe. V plynu se pohybují chaoticky vysokou rychlostí a vyplňují celý objem. Teplota je míra průměrné kinetické energie částic. Brownův pohyb je viditelný důsledek nárazů malých molekul do větší částice.",
        wiki: "https://cs.wikipedia.org/wiki/Skupenství"
      },
      2: {
        title: "Hustota a objem",
        formulas: [
          { name: "Hustota", expr: "ρ = m / V" },
          { name: "Objem vytlačením", expr: "V_tělesa = V₂ - V₁" }
        ],
        description: "Hustota je fyzikální veličina, která udává, jaká hmotnost látky je obsažena v jednotce objemu. Pro měření objemu tělesa nepravidelného tvaru se používá metoda vytlačení: těleso se ponoří do vody a změří se rozdíl hladin. Ze znalosti hmotnosti (z vah) a objemu lze vypočítat hustotu.",
        wiki: "https://cs.wikipedia.org/wiki/Hustota"
      },
      3: {
        title: "Magnetické vlastnosti",
        formulas: [
          { name: "Interakce pólů", expr: "Stejnojmenné póly se odpuzují, různojmenné přitahují" }
        ],
        description: "Každý magnet má dva póly: severní (N) a jižní (S). V okolí magnetu existuje magnetické pole, které lze vizualizovat pomocí železných pilin. Piliny se seřadí podél siločar magnetického pole, které vycházejí ze severního pólu a vcházejí do jižního.",
        wiki: "https://cs.wikipedia.org/wiki/Magnetické_pole"
      }
    },
    7: {
      1: {
        title: "Archimedův zákon",
        formulas: [
          { name: "Vztlaková síla", expr: "F_v = ρ_k · g · V_p" },
          { name: "Podmínka plavání", expr: "ρ_t < ρ_k → těleso plave" }
        ],
        description: "Těleso ponořené do kapaliny je nadlehčováno vztlakovou silou, která se rovná tíze kapaliny stejného objemu, jako je ponořená část tělesa.",
        wiki: "https://cs.wikipedia.org/wiki/Archimedův_zákon"
      },
      2: {
        title: "Rovnoměrný přímočarý pohyb",
        formulas: [
          { name: "Dráha", expr: "s = v · t" },
          { name: "Rychlost", expr: "v = s / t" }
        ],
        description: "Pohyb, při kterém těleso urazí za stejné časové intervaly stejné dráhy. Grafem dráhy v závislosti na čase je přímka.",
        wiki: "https://cs.wikipedia.org/wiki/Rovnoměrný_pohyb"
      },
      3: {
        title: "Momentová věta (Páka)",
        formulas: [
          { name: "Momentová věta", expr: "F₁ · d₁ = F₂ · d₂" },
          { name: "Moment síly", expr: "M = F · d" }
        ],
        description: "Páka je v rovnováze, pokud se moment síly otáčející ji ve směru hodinových ručiček rovná momentu síly otáčející ji proti směru.",
        wiki: "https://cs.wikipedia.org/wiki/Páka"
      },
      4: {
        title: "Hydrostatický tlak",
        formulas: [
          { name: "Hydrostatický tlak", expr: "p = ρ · g · h" }
        ],
        description: "Tlak vyvolaný tíhou kapaliny závisí na její hustotě a hloubce pod povrchem.",
        wiki: "https://cs.wikipedia.org/wiki/Pascalův_zákon"
      }
    },
    8: {
        1: {
          title: "Ohmův zákon",
          formulas: [
            { name: "Ohmův zákon", expr: "I = U / R" }
          ],
          description: "Elektrický proud v kovovém vodiči je přímo úměrný elektrickému napětí a nepřímo úměrný elektrickému odporu vodiče.",
          wiki: "https://cs.wikipedia.org/wiki/Ohmův_zákon"
        },
        2: {
          title: "Skupenství látek",
          formulas: [
            { name: "Teplo", expr: "Q = c · m · Δt" }
          ],
          description: "Při tání a varu se dodané teplo spotřebuje na narušení vazeb mezi molekulami, teplota se nemění.",
          wiki: "https://cs.wikipedia.org/wiki/Skupenství"
        },
        3: {
          title: "Tepelná vodivost",
          formulas: [
            { name: "Fourierův zákon", expr: "Q / t = k · A · ΔT / L" }
          ],
          description: "Přenos vnitřní energie z teplejších částí tělesa do chladnějších částí.",
          wiki: "https://cs.wikipedia.org/wiki/Vedení_tepla"
        },
        4: {
          title: "Magnetické pole",
          formulas: [
            { name: "Magnetická indukce", expr: "B = μ₀ · I / (2πr)" }
          ],
          description: "V okolí permanentních magnetů a vodičů s proudem existuje magnetické pole.",
          wiki: "https://cs.wikipedia.org/wiki/Magnetické_pole"
        }
    },
    9: {
        1: {
          title: "Lom světla",
          formulas: [
            { name: "Snellův zákon", expr: "n₁ · sin α = n₂ · sin β" }
          ],
          description: "Spojná čočka sbírá paralelní paprsky do ohniska. Rozptylka je rozptyluje.",
          wiki: "https://cs.wikipedia.org/wiki/Snellův_zákon"
        },
        2: {
          title: "Mechanické vlnění",
          formulas: [
            { name: "Rychlost vlnění", expr: "v = λ · f" }
          ],
          description: "Vlnění přenáší energii, nikoliv látku.",
          wiki: "https://cs.wikipedia.org/wiki/Mechanické_vlnění"
        },
        3: {
          title: "Odraz světla",
          formulas: [
            { name: "Zákon odrazu", expr: "α = α'" }
          ],
          description: "Úhel odrazu se rovná úhlu dopadu.",
          wiki: "https://cs.wikipedia.org/wiki/Odraz_světla"
        },
        4: {
          title: "Dopplerův jev",
          formulas: [
            { name: "Změna frekvence", expr: "f' = f · (v / (v ± v_s))" }
          ],
          description: "Změna frekvence a vlnové délky přijímaného signálu způsobená pohybem zdroje.",
          wiki: "https://cs.wikipedia.org/wiki/Dopplerův_jev"
        }
    },
    10: {
        1: {
          title: "Newtonovy zákony",
          formulas: [
            { name: "Druhý Newtonův zákon", expr: "F = m · a" }
          ],
          description: "Zrychlení tělesa je přímo úměrné výslednici sil a nepřímo úměrné hmotnosti tělesa.",
          wiki: "https://cs.wikipedia.org/wiki/Newtonovy_pohybové_zákony"
        },
        2: {
          title: "Ideální plyn",
          formulas: [
            { name: "Stavová rovnice", expr: "pV = nRT" }
          ],
          description: "Tlak je způsoben nárazy molekul na stěny nádoby.",
          wiki: "https://cs.wikipedia.org/wiki/Kinetická_teorie_látek"
        },
        3: {
          title: "Balistika",
          formulas: [
            { name: "Rovnice trajektorie", expr: "y(x) = x·tanα - (gx²) / (2v₀²cos²α)" }
          ],
          description: "Těleso vržené pod úhlem se pohybuje po parabole.",
          wiki: "https://cs.wikipedia.org/wiki/Balistika"
        },
        4: {
          title: "Práce plynu",
          formulas: [
            { name: "Práce plynu", expr: "W = p · ΔV" }
          ],
          description: "Plyn koná práci při změně svého objemu.",
          wiki: "https://cs.wikipedia.org/wiki/Izotermický_děj"
        }
    },
    11: {
        1: {
          title: "Lorentzova síla",
          formulas: [
            { name: "Lorentzova síla", expr: "F = qvB·sinα" }
          ],
          description: "Magnetické pole vychyluje nabité částice.",
          wiki: "https://cs.wikipedia.org/wiki/Lorentzova_síla"
        },
        2: {
          title: "Radioaktivní rozpad",
          formulas: [
            { name: "Zákon rozpadu", expr: "N(t) = N₀ · 2^(−t/T½)" }
          ],
          description: "Za jeden poločas rozpadu se rozpadne přesně polovina jader.",
          wiki: "https://cs.wikipedia.org/wiki/Radioaktivní_rozpad"
        },
        3: {
          title: "Elektromagnetická indukce",
          formulas: [
            { name: "Faradayův zákon", expr: "U_i = -ΔΦ / Δt" }
          ],
          description: "Proměnné magnetické pole vytváří vířivé elektrické pole.",
          wiki: "https://cs.wikipedia.org/wiki/Elektromagnetická_indukce"
        },
        4: {
          title: "Fotoelektrický jev",
          formulas: [
            { name: "Einsteinova rovnice", expr: "hf = W_v + E_k" }
          ],
          description: "Jev, při kterém světlo dopadající na povrch kovu vyráží z kovu elektrony.",
          wiki: "https://cs.wikipedia.org/wiki/Fotoelektrický_jev"
        }
    }
  }
};

export default translations;
