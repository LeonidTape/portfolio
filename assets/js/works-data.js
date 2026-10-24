/* Работы и карточки сайта. Файл ведёт админка (папка admin/) или его можно править вручную. */
window.WORK_TAGS = {
  "backend": {
    "ru": "Backend",
    "sr": "Backend",
    "en": "Backend"
  },
  "web": {
    "ru": "Веб",
    "sr": "Veb",
    "en": "Web"
  },
  "uiux": {
    "ru": "UI/UX",
    "sr": "UI/UX",
    "en": "UI/UX"
  },
  "games": {
    "ru": "Игры",
    "sr": "Igre",
    "en": "Games"
  },
  "motion": {
    "ru": "Motion",
    "sr": "Motion",
    "en": "Motion"
  },
  "video": {
    "ru": "Видео",
    "sr": "Video",
    "en": "Video"
  },
  "ai": {
    "ru": "ИИ",
    "sr": "AI",
    "en": "AI"
  },
  "graphic": {
    "ru": "Графика",
    "sr": "Grafika",
    "en": "Graphics"
  }
};
window.WORKS = [
  {
    "id": "project-discord-bot-controller",
    "year": "2025",
    "tags": [
      "backend"
    ],
    "cover": "assets/uploads/works/discord-bot-controller/1.webp",
    "title": {
      "ru": "Discord Bot Controller",
      "sr": "Discord Bot Controller",
      "en": "Discord Bot Controller"
    },
    "summary": {
      "ru": "Настольное приложение для Windows: запуск, остановка и авто-перезапуск Discord-бота с логами в одном окне.",
      "sr": "Desktop aplikacija za Windows koja pokreće, zaustavlja i automatski ponovo pokreće Discord bota, sa logovima u jednom prozoru.",
      "en": "A Windows desktop app that starts, stops and auto-restarts a Discord bot, with its logs in one window."
    },
    "blocks": [
      {
        "type": "text",
        "heading": {},
        "text": {
          "ru": "Python · tkinter / ttkbootstrap · discord.py 2.5 · PyInstaller/Nuitka · 2025",
          "sr": "Python · tkinter / ttkbootstrap · discord.py 2.5 · PyInstaller/Nuitka · 2025",
          "en": "Python · tkinter / ttkbootstrap · discord.py 2.5 · PyInstaller/Nuitka · 2025"
        }
      },
      {
        "type": "text",
        "heading": {
          "ru": "О проекте",
          "sr": "O projektu",
          "en": "About the project"
        },
        "text": {
          "ru": "Discord Bot Controller — настольное приложение для Windows, которое запускает, останавливает и перезапускает Discord-бота и выводит его логи в одном окне. Пользователю не нужно открывать терминал и следить за процессом вручную. Есть режим автоматического перезапуска: приложение следит за файлами бота и поднимает его заново после изменений.\nИнтерфейс сделан в тёмной теме. Внизу расположены переключатель запуска, кнопка перезапуска и настройки авто-перезапуска. Вверху есть меню, где можно выбрать файл бота и открыть настройки. Вывод бота появляется в общей консоли.",
          "sr": "Discord Bot Controller je desktop aplikacija za Windows koja pokreće, zaustavlja i ponovo pokreće Discord bota i prikazuje njegove logove u jednom prozoru. Korisniku ne treba terminal i ne mora ručno da prati proces. Postoji režim automatskog ponovnog pokretanja: aplikacija prati fajlove bota i podiže ga ponovo posle izmena.\nInterfejs je u tamnoj temi. Dole se nalaze prekidač za pokretanje, dugme za ponovno pokretanje i podešavanja automatskog restarta. Gore je meni za izbor fajla bota i otvaranje podešavanja. Ispis bota se pojavljuje u zajedničkoj konzoli.",
          "en": "Discord Bot Controller is a desktop app for Windows that starts, stops and restarts a Discord bot and shows its logs in one window. The user doesn't need to open a terminal or watch the process by hand. There is an auto-restart mode: the app watches the bot's files and brings it back up after changes.\nThe interface uses a dark theme. The bottom of the window holds the start switch, the restart button and the auto-restart settings. The top has a menu for choosing the bot file and opening settings. The bot's output appears in a shared console."
        }
      },
      {
        "type": "text",
        "heading": {
          "ru": "Как устроено",
          "sr": "Kako je organizovano",
          "en": "How it works"
        },
        "text": {
          "ru": "Приложение состоит из главного окна и отдельных модулей в папках commands/ и utils/:\nЗапуск бота (start.py): читает путь к боту из config.json, запускает .py или .exe как дочерний процесс, пишет его PID в файл и отдаёт stdout и stderr в консоль через отдельные потоки. Сам бот не требует изменений.\nОстановка (stop.py): по сохранённому PID завершает процесс. В Windows используется taskkill /F, в других системах SIGTERM.\nПерезапуск (restart.py): останавливает и снова запускает бота с одной кнопки.\nАвто-перезапуск (auto_restart.py): в фоновом потоке проверяет время изменения файлов в папке бота и перезапускает его при изменениях. Какие файлы отслеживать, задаётся в настройках, которые хранятся в restart_options.json.\nНастройки (settings.py, restart_settings.py): окна для указания пути к боту и папке, а также для выбора отслеживаемых файлов. Данные сохраняются в JSON.\nОбновления (Updater.py): отдельное окно проверяет release.json в репозитории на GitHub, сравнивает версию с локальной, скачивает dbc.zip с прогресс-баром, распаковывает и запускает новую версию.\nСлужебные части: paths.py определяет, где хранить данные (%APPDATA% в Windows, домашняя папка в остальных системах), open_file.py открывает диалог выбора файла.\nКонфигурация и PID лежат в пользовательской папке, а не рядом с программой. Это важно, потому что собранный .exe может лежать в защищённом каталоге. Ресурсы (иконка, шрифты) упакованы внутри сборки и читаются через sys._MEIPASS.",
          "sr": "Aplikacija se sastoji od glavnog prozora i zasebnih modula u folderima commands/ i utils/:\nPokretanje (start.py): čita putanju do bota iz config.json, pokreće .py ili .exe fajl kao child proces, upisuje njegov PID u fajl i šalje stdout i stderr u konzolu preko zasebnih niti. Sam bot ne zahteva nikakve izmene.\nZaustavljanje (stop.py): preko sačuvanog PID-a završava proces. Na Windows-u koristi taskkill /F, na ostalim sistemima SIGTERM.\nPonovno pokretanje (restart.py): zaustavlja i ponovo pokreće bota jednim dugmetom.\nAutomatski restart (auto_restart.py): u pozadinskoj niti proverava vreme izmene fajlova u folderu bota i restartuje ga kad se fajlovi promene. Koje fajlove pratiti podešava se u postavkama, koje se čuvaju u restart_options.json.\nPodešavanja (settings.py, restart_settings.py): prozori za unos putanje do bota i foldera i za izbor fajlova koji se prate. Podaci se čuvaju kao JSON.\nAžuriranja (Updater.py): poseban prozor proverava release.json u GitHub repozitorijumu, upoređuje verziju sa lokalnom, preuzima dbc.zip uz traku napretka, raspakuje ga i pokreće novu verziju.\nPomoćni delovi: paths.py određuje gde se čuvaju podaci (%APPDATA% na Windows-u, početni folder na ostalim sistemima), open_file.py otvara dijalog za izbor fajla.\nKonfiguracija i PID se čuvaju u korisničkom folderu, a ne pored programa. To je važno jer se gotov .exe može nalaziti u zaštićenom direktorijumu. Resursi (ikona, fontovi) su upakovani u build i čitaju se preko sys._MEIPASS.",
          "en": "The app consists of a main window and separate modules in the commands/ and utils/ folders:\nStart (start.py): reads the bot's path from config.json, runs a .py or .exe file as a child process, writes its PID to a file and streams stdout and stderr to the console through separate threads. The bot itself doesn't need any changes.\nStop (stop.py): terminates the process by its saved PID. On Windows it uses taskkill /F, elsewhere SIGTERM.\nRestart (restart.py): stops and starts the bot again with a single button.\nAuto-restart (auto_restart.py): in a background thread checks the modification time of files in the bot's folder and restarts the bot when they change. Which files to watch is set in the settings, stored in restart_options.json.\nSettings (settings.py, restart_settings.py): windows for setting the bot path and folder, and for choosing which files to watch. Data is saved as JSON.\nUpdates (Updater.py): a separate window checks release.json in the GitHub repository, compares the version with the local one, downloads dbc.zip with a progress bar, unpacks it and launches the new version.\nUtilities: paths.py decides where data is stored (%APPDATA% on Windows, the home folder elsewhere), open_file.py opens the file picker.\nConfiguration and PID files live in the user's folder, not next to the program. This matters because a built .exe may sit in a protected directory. Resources (icon, fonts) are packed inside the build and read through sys._MEIPASS."
        }
      },
      {
        "type": "text",
        "heading": {
          "ru": "Технические детали",
          "sr": "Tehnički detalji",
          "en": "Technical details"
        },
        "text": {
          "ru": "Потоки (threading) для запуска процессов, чтения вывода и фонового отслеживания, чтобы интерфейс не зависал\nРабота с процессами через subprocess.Popen, CREATE_NO_WINDOW, PYTHONUNBUFFERED\nОпределение путей для режима разработки и для скомпилированной версии (sys.frozen)\nОбновление через urllib и zipfile с сообщениями о прогрессе\nСборка в исполняемый файл через PyInstaller или Nuitka, в requirements.txt зафиксированы версии зависимостей",
          "sr": "threading za pokretanje procesa, čitanje ispisa i pozadinsko praćenje, da interfejs ne bi zamrzavao\nRad sa procesima preko subprocess.Popen, CREATE_NO_WINDOW, PYTHONUNBUFFERED\nOdređivanje putanja za razvojni režim i za kompajliranu verziju (sys.frozen)\nAžuriranje preko urllib i zipfile uz poruke o napretku\nBuild u izvršni fajl preko PyInstaller ili Nuitka; verzije zavisnosti su fiksirane u requirements.txt",
          "en": "threading for launching processes, reading output and background watching, so the interface doesn't freeze\nProcess handling with subprocess.Popen, CREATE_NO_WINDOW, PYTHONUNBUFFERED\nPath resolution for development and for the compiled version (sys.frozen)\nUpdates via urllib and zipfile with progress messages\nBuilding an executable with PyInstaller or Nuitka; dependency versions are pinned in requirements.txt"
        }
      },
      {
        "type": "text",
        "heading": {
          "ru": "Что можно улучшить",
          "sr": "Šta bi se moglo poboljšati",
          "en": "What could be improved"
        },
        "text": {
          "ru": "Код главного файла main.py длинный: вся логика интерфейса написана в одной функции main(). Стоит разбить её на классы для каждого экрана.\nМодули подключаются через try/except ImportError с None, и потом везде стоит проверка hasattr. Это скрывает ошибки, которые лучше бы сразу показывать.\nВо многих местах повторяется код получения папки данных. Его можно вынести в один общий модуль.\nВ requirements.txt есть инструменты сборки и лишние зависимости, например Flask, Bottle, Werkzeug и gevent. Они, похоже, остались от других экспериментов. Файл сохранён в UTF-16, это может мешать pip install -r.\nФункции stop и restart работают с PID в файле. Если бот упадёт сам, файл останется, и управление может сбиться.",
          "sr": "Glavni fajl main.py je dugačak: sva logika interfejsa je u jednoj funkciji main(). Trebalo bi je podeliti u klase, po jedna za svaki ekran.\nModuli se uvoze preko try/except ImportError sa None, a onda se svuda proverava hasattr. Tako se kriju greške koje bi bilo bolje odmah prikazati.\nKod za dobijanje foldera sa podacima ponavlja se na više mesta. Mogao bi da ide u jedan zajednički modul.\nrequirements.txt sadrži alate za build i nepotrebne zavisnosti, npr. Flask, Bottle, Werkzeug i gevent. Čini se da su ostali od drugih eksperimenata. Fajl je sačuvan u UTF-16, što može da smeta pri pip install -r.\nFunkcije stop i restart rade sa PID-om iz fajla. Ako bot sam padne, fajl ostaje i upravljanje može da se pomeša.",
          "en": "main.py is long: all of the interface logic lives in one main() function. It should be split into classes, one per screen.\nModules are imported with try/except ImportError falling back to None, and then checked with hasattr everywhere. This hides errors that should be shown right away.\nThe code that gets the data folder is repeated in many places. It could go into one shared module.\nrequirements.txt contains build tools and unnecessary dependencies, such as Flask, Bottle, Werkzeug and gevent. They seem to be left over from other experiments. The file is saved in UTF-16, which can get in the way of pip install -r.\nThe stop and restart functions rely on the PID in the file. If the bot crashes on its own, the file stays behind and control can get out of sync."
        }
      }
    ],
    "cardId": "",
    "featured": false,
    "href": "",
    "newTab": false,
    "links": []
  },
  {
    "id": "project-lt-project",
    "year": "",
    "tags": [
      "motion",
      "video"
    ],
    "cover": "assets/uploads/works/lt-project/poster.jpg",
    "title": {
      "ru": "LT PROJECT",
      "sr": "LT PROJECT",
      "en": "LT PROJECT"
    },
    "summary": {
      "ru": "Короткое видео в стиле видеоигры: UI-анимации, синхронизация с музыкой и игровые интерфейсы.",
      "sr": "Kratak video u stilu video-igre: UI animacije, pokret sinhronizovan sa muzikom i igrački interfejsi.",
      "en": "A short video in video-game style: UI animation, music-synced motion and game interfaces."
    },
    "blocks": [
      {
        "type": "text",
        "heading": {},
        "text": {
          "ru": "Проект в стиле видеоигры · UI-анимации, motion design, видео-продакшн, After Effects\nLT PROJECT — короткое видео в стилистике видеоигры. Оно создано для демонстрации анимации интерфейсов, музыкальной визуализации и интерактивных элементов. Основой стали элементы игровых интерфейсов: панель управления, индикаторы воспроизведения, игровые кнопки и всплывающие меню. Проект показывает мои навыки работы в After Effects, написания сценария и пост-продакшна.",
          "sr": "Projekat u stilu video-igre · UI animacije, motion dizajn, video produkcija, After Effects\nLT PROJECT je kratak video u stilu video-igre. Napravljen je da pokaže animaciju interfejsa, muzičku vizuelizaciju i interaktivne elemente. Osnova su elementi igračkih interfejsa: kontrolna tabla, indikatori reprodukcije, igračka dugmad i iskačući meniji. Projekat pokazuje moje veštine rada u After Effects-u, pisanja scenarija i post-produkcije.",
          "en": "Video-game style project · UI animation, motion design, video production, After Effects\nLT PROJECT is a short video in the style of a video game. It was made to show interface animation, music visualization and interactive elements. The base is game interface elements: a control panel, playback indicators, game buttons and pop-up menus. The project shows my skills in After Effects, scriptwriting and post-production."
        }
      },
      {
        "type": "embed",
        "url": "https://vkvideo.ru/video-230834796_456239021",
        "caption": {}
      },
      {
        "type": "text",
        "heading": {
          "ru": "Задачи проекта",
          "sr": "Ciljevi projekta",
          "en": "Project goals"
        },
        "text": {
          "ru": "Создать динамичное видео в игровой эстетике.\nПроанимировать UI-элементы: кнопки, интерфейс, индикаторы.\nСинхронизировать визуал с музыкой.\nПродумать короткий сценарий и логику действия.",
          "sr": "Napraviti dinamičan video u igračkoj estetici.\nAnimirati UI elemente: dugmad, interfejs, indikatore.\nSinhronizovati vizual sa muzikom.\nOsmisliti kratak scenario i logiku radnje.",
          "en": "Create a dynamic video in a game aesthetic.\nAnimate UI elements: buttons, interface, indicators.\nSync the visuals with music.\nPlan a short script and the logic of the action."
        }
      },
      {
        "type": "text",
        "heading": {
          "ru": "Концепция",
          "sr": "Koncept",
          "en": "Concept"
        },
        "text": {
          "ru": "UI-анимация. Анимация кнопок, появление панелей, микродвижения и покачивания для динамики. Объекты синхронизированы с аудиоспектром.\nРабота со звуком. Подбор музыки и звуковых эффектов, синхронизация эффектов с движением, работа с ритмом в Premiere и After Effects, озвучка.\nПост-продакшн. Цветокоррекция, имитация экрана, финальный композитинг, экспорт без потери качества.",
          "sr": "UI animacija. Animacija dugmadi, pojavljivanje panela, mikropokreti i ljuljanje za dinamiku. Objekti su sinhronizovani sa audio spektrom.\nRad sa zvukom. Izbor muzike i zvučnih efekata, sinhronizacija efekata sa pokretom, rad sa ritmom u Premiere-u i After Effects-u, sinhronizacija glasa.\nPost-produkcija. Korekcija boje, imitacija ekrana, finalni kompozit, izvoz bez gubitka kvaliteta.",
          "en": "UI animation. Button animation, panels appearing, micro-movements and sway for dynamics. Objects are synced to the audio spectrum.\nWorking with sound. Choosing music and sound effects, syncing effects with motion, working with rhythm in Premiere and After Effects, voice-over.\nPost-production. Color correction, screen simulation, final compositing, export without quality loss."
        }
      },
      {
        "type": "text",
        "heading": {
          "ru": "Моя роль",
          "sr": "Moja uloga",
          "en": "My role"
        },
        "text": {
          "ru": "В рамках проекта я отвечал за весь цикл разработки:\nИдея и сценарий. Разработал концепцию ролика, общую логику, последовательность сцен и игровую стилистику.\nДизайн UI-элементов. Создал панели, кнопки, индикаторы, всплывающие окна и игровые акценты.\nАнимация в After Effects. Проанимировал появление интерфейса, переходы, световые эффекты, микроанимации и динамические движения.\nМонтаж. Собрал финальную структуру видео, выстроил темп, последовательность сцен и связки между кадрами.\nЗвук. Подобрал музыку, синхронизировал движения с ритмом, добавил звуковые эффекты и обработал озвучку.\nПост-продакшн. Добавил текстуры, световые эффекты, цифровой шум и эффекты экрана, сделал итоговый композитинг и экспорт.",
          "sr": "U okviru projekta bio sam zadužen za ceo ciklus razvoja:\nIdeja i scenario. Razvio sam koncept, opštu logiku, redosled scena i igračku stilistiku.\nUI dizajn. Napravio sam panele, dugmad, indikatore, iskačuće prozore i igračke akcente.\nAnimacija u After Effects-u. Animirao sam pojavljivanje interfejsa, prelaze, svetlosne efekte, mikroanimacije i dinamičke pokrete.\nMontaža. Sastavio sam finalnu strukturu videa, postavio tempo, redosled scena i veze između kadrova.\nZvuk. Izabrao sam muziku, sinhronizovao pokrete sa ritmom, dodao zvučne efekte i obradio glas.\nPost-produkcija. Dodao sam teksture, svetlosne efekte, digitalni šum i efekte ekrana, uradio finalni kompozit i izvoz.",
          "en": "I was responsible for the whole development cycle:\nIdea and script. I developed the concept, the overall logic, the sequence of scenes and the game style.\nUI design. I created panels, buttons, indicators, pop-up windows and game accents.\nAfter Effects animation. I animated the appearance of the interface, transitions, light effects, micro-animations and dynamic movements.\nEditing. I assembled the final structure of the video, set the pace, the sequence of scenes and the links between shots.\nSound. I chose the music, synced movements to the rhythm, added sound effects and processed the voice-over.\nPost-production. I added textures, light effects, digital noise and screen effects, and made the final compositing and export."
        }
      },
      {
        "type": "text",
        "heading": {
          "ru": "Результат",
          "sr": "Rezultat",
          "en": "Result"
        },
        "text": {
          "ru": "Получилось видео в яркой игровой стилистике с большим количеством UI-анимаций и продуманной проработкой деталей. Работа показывает мои навыки motion-дизайнера: я умею создавать визуально насыщенные ролики, в которых интерфейс, музыка и монтаж работают вместе.",
          "sr": "Dobijen je video u živoj igračkoj stilistici sa mnogo UI animacija i pažljivo razrađenim detaljima. Rad pokazuje moje veštine motion dizajnera: umem da pravim vizuelno bogate videe u kojima interfejs, muzika i montaža rade zajedno.",
          "en": "The result is a video in a bright game style with many UI animations and careful attention to detail. The work shows my skills as a motion designer: I can make visually rich videos where the interface, music and editing work together."
        }
      }
    ],
    "cardId": "",
    "featured": false,
    "href": "",
    "newTab": false,
    "links": []
  },
  {
    "id": "project-pokaduedem",
    "year": "",
    "tags": [
      "games",
      "web"
    ],
    "cover": "assets/uploads/works/pokaduedem/1.webp",
    "title": {
      "ru": "Pokaduedem: браузерная гоночная игра",
      "sr": "Pokaduedem: igra trke u brauzeru",
      "en": "Pokaduedem: browser racing game"
    },
    "summary": {
      "ru": "Браузерная гоночная игра с очками, нитро, таблицей лидеров и данными в реальном времени.",
      "sr": "Igra trke u brauzeru sa bodovima, nitrom, tabelom najboljih i podacima u realnom vremenu.",
      "en": "A browser racing game with scoring, nitro, a leaderboard and real-time stats."
    },
    "blocks": [
      {
        "type": "text",
        "heading": {},
        "text": {
          "ru": "Роль: геймдизайн, фронтенд-разработка\nТип: личный проект / академический проект\nБраузерная гоночная игра, разработанная как интерактивный элемент Pulse Pistons, концепции цифрового журнала о спортивных автомобилях.\nПроект исследует, как игровой опыт может дополнять автомобильный редакционный контент. Игра объединяет аркадную гоночную механику, игровой интерфейс с отображением данных в реальном времени, систему очков и таблицу лидеров в лёгком веб-приложении.",
          "sr": "Uloga: game dizajn, front-end razvoj\nTip: lični projekat / akademski projekat\nIgra trke u brauzeru napravljena kao interaktivni element za Pulse Pistons, koncept digitalnog magazina o sportskim automobilima.\nProjekat istražuje kako iskustvo igre može da dopuni redakcijski sadržaj o automobilima. Igra spaja arkadnu mehaniku trke, igrački interfejs sa podacima u realnom vremenu, sistem bodovanja i tabelu najboljih u laganoj veb aplikaciji.",
          "en": "Role: game design, front-end development\nType: personal project / academic project\nA browser racing game made as an interactive element of Pulse Pistons, a concept digital magazine about sports cars.\nThe project explores how a game experience can complement car editorial content. The game combines arcade racing mechanics, a game interface with real-time data, a scoring system and a leaderboard in a lightweight web app."
        }
      },
      {
        "type": "carousel",
        "items": [
          {
            "src": "assets/uploads/works/pokaduedem/1.webp",
            "caption": {}
          }
        ]
      },
      {
        "type": "text",
        "heading": {
          "ru": "Основные возможности",
          "sr": "Glavne mogućnosti",
          "en": "Main features"
        },
        "text": {
          "ru": "Интерактивный аркадный гоночный процесс\nОтображение очков и игрового состояния в реальном времени\nСистема нитро и развитие игрового процесса\nИнтерфейс таблицы лидеров\nЗапуск непосредственно в браузере",
          "sr": "Interaktivan arkadni tok trke\nPrikaz bodova i stanja igre u realnom vremenu\nSistem nitra i razvoj igrače dinamike\nInterfejs tabele najboljih\nPokretanje direktno u brauzeru",
          "en": "Interactive arcade racing gameplay\nReal-time display of score and game state\nNitro system and gameplay progression\nLeaderboard interface\nRuns directly in the browser"
        }
      },
      {
        "type": "text",
        "heading": {
          "ru": "Мой вклад",
          "sr": "Moj doprinos",
          "en": "My contribution"
        },
        "text": {
          "ru": "Спроектировал и разработал игру в рамках более масштабной концепции интерактивного автомобильного издания. Объединил игровые механики, элементы интерфейса и веб-технологии в работающий игровой прототип.\nИнструменты: HTML, CSS, JavaScript, ChatGPT, GitHub Copilot",
          "sr": "Dizajnirao sam i razvio igru u okviru šireg koncepta interaktivnog automobilskog izdanja. Spojio sam igračke mehanike, elemente interfejsa i veb tehnologije u radni igrački prototip.\nAlati: HTML, CSS, JavaScript, ChatGPT, GitHub Copilot",
          "en": "I designed and developed the game as part of a larger concept of an interactive car publication. I combined the game mechanics, interface elements and web technologies into a working game prototype.\nTools: HTML, CSS, JavaScript, ChatGPT, GitHub Copilot"
        }
      }
    ],
    "cardId": "",
    "featured": false,
    "href": "",
    "newTab": false,
    "links": []
  },
  {
    "id": "project-pulse-pistons",
    "year": "",
    "tags": [
      "uiux",
      "web",
      "ai",
      "motion"
    ],
    "cover": "assets/uploads/works/pulse-pistons/1.webp",
    "title": {
      "ru": "Pulse&Pistons",
      "sr": "Pulse&Pistons",
      "en": "Pulse&Pistons"
    },
    "summary": {
      "ru": "Концепт сетевого журнала о спортивных автомобилях: UI/UX, motion design и модуль ИИ.",
      "sr": "Koncept onlajn magazina o sportskim automobilima: UI/UX, motion dizajn i AI modul.",
      "en": "A concept online magazine about sports cars: UI/UX, motion design and an AI module."
    },
    "blocks": [
      {
        "type": "text",
        "heading": {},
        "text": {
          "ru": "UI/UX дизайн, веб-разработка, интеграция ИИ, motion design · Readymag · дипломный проект\nPulse&Pistons — концепт сетевого журнала о спортивных автомобилях. Задача проекта — передать динамику автоиндустрии через визуальный язык, в котором скорость и мощность выражены композицией, типографикой и контрастной палитрой. Журнал должен быть удобным: с понятной навигацией, информационной архитектурой и крупными визуальными блоками, которые ведут читателя от материала к материалу. Отдельная часть проекта — модуль искусственного интеллекта, который генерирует контент и повышает интерактивность журнала.",
          "sr": "UI/UX dizajn, veb razvoj, integracija AI-ja, motion dizajn · Readymag · diplomski projekat\nPulse&Pistons je koncept onlajn magazina o sportskim automobilima. Zadatak projekta je da prenese dinamiku automobilske industrije kroz vizuelni jezik u kojem su brzina i snaga izraženi kompozicijom, tipografijom i kontrastnom paletom. Magazin treba da bude praktičan: sa jasnom navigacijom, informacionom arhitekturom i velikim vizuelnim blokovima koji čitaoca vode od jednog materijala do sledećeg. Poseban deo projekta je AI modul koji generiše sadržaj i čini magazin interaktivnijim.",
          "en": "UI/UX design, web development, AI integration, motion design · Readymag · diploma project\nPulse&Pistons is a concept online magazine about sports cars. The goal of the project is to convey the dynamics of the auto industry through a visual language in which speed and power are expressed through composition, typography and a contrasting palette. The magazine has to be convenient: with clear navigation, an information architecture and large visual blocks that lead the reader from one piece of material to the next. A separate part of the project is an AI module that generates content and makes the magazine more interactive."
        }
      },
      {
        "type": "embed",
        "url": "https://vkvideo.ru/video-230834796_456239022",
        "caption": {}
      },
      {
        "type": "carousel",
        "items": [
          {
            "src": "assets/uploads/works/pulse-pistons/1.webp",
            "caption": {}
          },
          {
            "src": "assets/uploads/works/pulse-pistons/2.webp",
            "caption": {}
          },
          {
            "src": "assets/uploads/works/pulse-pistons/3.webp",
            "caption": {}
          },
          {
            "src": "assets/uploads/works/pulse-pistons/4.webp",
            "caption": {}
          }
        ]
      },
      {
        "type": "text",
        "heading": {
          "ru": "Задачи проекта",
          "sr": "Ciljevi projekta",
          "en": "Project goals"
        },
        "text": {
          "ru": "Передать динамику автоиндустрии. Создать визуальный язык, который отражает скорость, мощность и эстетику спортивных автомобилей через композицию, типографику и контрастную палитру.\nСделать удобную структуру. Разработать навигацию и информационную архитектуру, чтобы пользователь быстро ориентировался и переходил между материалами.\nВстроить функционал ИИ. Интегрировать модуль, который генерирует контент и повышает интерактивность журнала.\nДобиться современного UI. Сформировать чистый интерфейс с акцентом на крупные визуальные блоки, динамичные элементы и читаемую типографику.",
          "sr": "Preneti dinamiku automobilske industrije. Napraviti vizuelni jezik koji odražava brzinu, snagu i estetiku sportskih automobila kroz kompoziciju, tipografiju i kontrastnu paletu.\nNapraviti praktičnu strukturu. Razviti navigaciju i informacionu arhitekturu da se korisnik brzo snalazi i prelazi između materijala.\nUgraditi AI funkcije. Dodati modul koji generiše sadržaj i čini magazin interaktivnijim.\nPostići moderan UI. Napraviti čist interfejs sa naglaskom na velike vizuelne blokove, dinamičke elemente i čitljivu tipografiju.",
          "en": "Convey the dynamics of the auto industry. Create a visual language that reflects speed, power and the aesthetics of sports cars through composition, typography and a contrasting palette.\nBuild a convenient structure. Develop navigation and an information architecture so the user can quickly find their way and move between materials.\nIntegrate AI features. Add a module that generates content and makes the magazine more interactive.\nAchieve a modern UI. Create a clean interface focused on large visual blocks, dynamic elements and readable typography."
        }
      },
      {
        "type": "text",
        "heading": {
          "ru": "Моя роль",
          "sr": "Moja uloga",
          "en": "My role"
        },
        "text": {
          "ru": "Я отвечал за весь цикл разработки:\nКонцепция. Определил идею журнала, его логику, структуру и общую стилистику.\nUI/UX дизайн. Создал навигацию, пользовательские сценарии и прототипы экранов.\nВизуальный стиль и графика. Разработал палитру, типографику, композиционные решения и графические элементы.\nАнимации и motion. Подготовил UI-анимации, переходы и элементы динамики, которые усиливают восприятие.\nИнтеграция ИИ. Проработал механику взаимодействия пользователя с ИИ-блоком и оформление результатов.\nВерстка в Readymag. Перенёс дизайн на платформу, оптимизировал блоки и изображения, настроил интерактивы и адаптивность.",
          "sr": "Bio sam zadužen za ceo ciklus razvoja:\nKoncept. Definisao sam ideju magazina, njegovu logiku, strukturu i opštu stilistiku.\nUI/UX dizajn. Napravio sam navigaciju, korisničke scenarije i prototipe ekrana.\nVizuelni stil i grafika. Razvio sam paletu, tipografiju, kompozicijska rešenja i grafičke elemente.\nAnimacije i motion. Pripremio sam UI animacije, prelaze i elemente dinamike koji pojačavaju doživljaj.\nIntegracija AI-ja. Razradio sam mehaniku interakcije korisnika sa AI blokom i prikaz rezultata.\nIzrada u Readymag-u. Preneo sam dizajn na platformu, optimizovao blokove i slike i podesio interaktivne elemente i prilagođavanje ekranu.",
          "en": "I was responsible for the whole development cycle:\nConcept. I defined the idea of the magazine, its logic, structure and overall style.\nUI/UX design. I created the navigation, user flows and screen prototypes.\nVisual style and graphics. I developed the palette, typography, compositional solutions and graphic elements.\nAnimation and motion. I prepared UI animations, transitions and dynamic elements that strengthen the perception.\nAI integration. I worked out how the user interacts with the AI block and how the results are presented.\nBuilding in Readymag. I moved the design to the platform, optimized blocks and images, and set up the interactive elements and responsiveness."
        }
      },
      {
        "type": "text",
        "heading": {
          "ru": "Реализация",
          "sr": "Realizacija",
          "en": "Implementation"
        },
        "text": {
          "ru": "Проект создан в Readymag, и это задавало рамки. Я оптимизировал его настолько, насколько позволяла платформа: учитывал её технические ограничения, адаптировал анимации, сжимал изображения, настраивал логику интерактивных блоков и добивался плавной работы сайта.\nПроект был отмечен Государственной экзаменационной комиссией как один из самых инновационных. Это единственная работа курса с полноценной ИИ-интеграцией, и комиссия отдельно подчеркнула высокий уровень исполнения дизайна, логики и реализации.",
          "sr": "Projekat je napravljen u Readymag-u, a to je postavljalo okvire. Optimizovao sam ga koliko je platforma dozvoljavala: uzimao sam u obzir njena tehnička ograničenja, prilagođavao animacije, kompresovao slike, podešavao logiku interaktivnih blokova i trudio se da sajt radi glatko.\nProjekat je Državna ispitna komisija označila kao jedan od najinovativnijih. To je jedini rad na kursu sa potpunom integracijom AI-ja, a komisija je posebno istakla visok nivo izvedbe dizajna, logike i realizacije.",
          "en": "The project was built in Readymag, and that set the boundaries. I optimized it as far as the platform allowed: I took its technical limits into account, adapted the animations, compressed the images, configured the logic of the interactive blocks and worked to make the site run smoothly.\nThe project was noted by the State Examination Committee as one of the most innovative. It is the only work in the course with full AI integration, and the committee specifically highlighted the high level of execution of the design, logic and implementation."
        }
      },
      {
        "type": "text",
        "heading": {
          "ru": "Результат",
          "sr": "Rezultat",
          "en": "Result"
        },
        "text": {
          "ru": "Проект объединил дизайн, технологичность и работу с ИИ в единую систему. В процессе я усилил навыки UI/UX, научился выстраивать сложные интерфейсы, работать с ограничениями платформы и создавать проекты, где визуал, функциональность и интерактивность работают как единое целое.",
          "sr": "Projekat je spojio dizajn, tehnologiju i rad sa AI-jem u jedinstven sistem. U procesu sam pojačao UI/UX veštine, naučio da pravim složene interfejse, radim u okvirima platforme i pravim projekte u kojima vizual, funkcionalnost i interaktivnost rade kao celina.",
          "en": "The project brought together design, technology and AI work into a single system. Along the way I strengthened my UI/UX skills, learned to build complex interfaces, work within the constraints of a platform, and create projects where visuals, functionality and interactivity work as one whole."
        }
      }
    ],
    "featured": true,
    "cardId": "",
    "href": "",
    "newTab": false,
    "links": []
  },
  {
    "id": "project-revolution",
    "year": "2019",
    "tags": [
      "backend"
    ],
    "cover": "assets/uploads/works/revolution/1.webp",
    "title": {
      "ru": "Revolution",
      "sr": "Revolution",
      "en": "Revolution"
    },
    "summary": {
      "ru": "Набор консольных утилит для Discord на Node.js. Первый самостоятельный проект, 2019.",
      "sr": "Skup konzolnih alata za Discord u Node.js-u. Moj prvi samostalni projekat, 2019.",
      "en": "A set of Discord console utilities in Node.js. My first independent project, 2019."
    },
    "blocks": [
      {
        "type": "text",
        "heading": {},
        "text": {
          "ru": "Первый самостоятельный проект · 2019 · Node.js, discord.js v11",
          "sr": "Moj prvi samostalni projekat · 2019 · Node.js, discord.js v11\nRevolution je skup konzolnih alata za Discord koji običan korisnički nalog pretvara u nalog sa mogućnostima bota. Nalog prima komande, moderira server, prikazuje četove i piše u kanale direktno iz konzole. Sve radi lokalno, interfejs je konzolni, sa obojenim ANSI ispisom i porukama na ruskom jeziku.",
          "en": "My first independent project · 2019 · Node.js, discord.js v11\nRevolution is a set of console utilities for Discord that turns an ordinary user account into an account with bot-like abilities. The account accepts commands, moderates a server, shows chats and writes to channels straight from the console. Everything runs locally, the interface is console-based, with colored ANSI output and messages in Russian."
        }
      },
      {
        "type": "text",
        "heading": {
          "ru": "О проекте",
          "sr": "O projektu",
          "en": "About the project"
        },
        "text": {
          "ru": "Revolution — набор консольных утилит для Discord, который превращает обычный пользовательский аккаунт в аккаунт с возможностями бота. Аккаунт принимает команды, модерирует сервер, показывает чаты и пишет в каналы прямо из консоли. Всё работает локально, интерфейс консольный, с цветным ANSI-выводом и русскоязычными сообщениями.\nГлавная идея в том, что Discord ограничивает юзерботов: автоматизация на обычных аккаунтах не предусмотрена. Revolution обходит это ограничение. Он подключается к клиентской библиотеке по токену пользовательского аккаунта, а не бота, и обычный профиль получает функциональность бота. Такой подход (селфбот) нарушает правила платформы, поэтому я считаю проект техническим экспериментом, а не продуктом. Он помог мне разобраться, как Discord устроен изнутри: авторизация, токены, события, система прав.",
          "sr": "Glavna ideja je u tome da Discord ograničava korisničke botove: automatizacija na običnim nalozima nije predviđena. Revolution zaobilazi to ograničenje. Povezuje se na klijentsku biblioteku preko tokena korisničkog naloga, a ne bot naloga, pa običan profil dobija funkcionalnost bota. Takav pristup (selfbot) krši pravila platforme, pa projekat smatram tehničkim eksperimentom, a ne proizvodom. Pomogao mi je da shvatim kako Discord radi iznutra: autorizacija, tokeni, događaji, sistem dozvola.",
          "en": "The main idea is that Discord restricts user bots: automation on regular accounts is not provided for. Revolution gets around this restriction. It connects to the client library with a user account token rather than a bot token, so an ordinary profile gets bot functionality. This approach (a selfbot) violates the platform's rules, so I consider the project a technical experiment rather than a product. It helped me understand how Discord works inside: authorization, tokens, events, the permission system."
        }
      },
      {
        "type": "text",
        "heading": {
          "ru": "Из чего состоит",
          "sr": "Iz čega se sastoji",
          "en": "What it consists of"
        },
        "text": {
          "ru": "Проект разделён на независимые модули, и каждый запускается отдельным .exe-лаунчером:\nRevolution (основной модуль)\nЗагружает команды динамически из папки cmd/ и запускает их по префиксу, который задаётся в конфиге. Команды:\nban, kick: бан и кик участников с проверкой прав аккаунта на сервере\naddrole: выдать себе роль, указанную в конфиге\nkeyfordel: удалить текстовый канал\nsid: узнать ID канала\nad: красиво оформленная реклама своего сервера эмбедом\ntotalad: массовая версия рекламы\nclear, help: служебные команды консоли\ndev: скрытая пасхалка с информацией об авторе\nСтатус аккаунта (online, idle, dnd, invisible) меняется через конфиг.\nRevolution Chat Viewer\nВыводит в консоль все сообщения, которые видит аккаунт, включая личные. Для каждого указаны сервер, канал и автор. Вывод можно ограничить одним каналом по ID.\nOther Person Chat\nВсё, что вводишь в консоль, уходит в выбранный канал от имени аккаунта. По сути консольный мессенджер поверх Discord.\nRevolution Fun Remover\nУдаляет каждое сообщение, которое появляется в чате, кроме одной секретной фразы. Это был эксперимент с автоматической модерацией.\nRevolution Permission Checker\nПо команде проходит по ~30 серверным правам (администратор, бан, кик, управление каналами и ролями, голосовые права и другие) и выводит в консоль зелёным и красным, какие из них есть у аккаунта.",
          "sr": "Projekat je podeljen na nezavisne module, a svaki se pokreće preko zasebnog .exe pokretača:\nRevolution (glavni modul). Dinamički učitava komande iz foldera cmd/ i pokreće ih po prefiksu koji se podešava u konfiguraciji. Komande:\nban, kick: ban i kick članova uz proveru prava naloga na serveru\naddrole: dodeljuje sebi ulogu navedenu u konfiguraciji\nkeyfordel: briše tekstualni kanal\nsid: prikazuje ID kanala\nad: lepo oblikovana reklama za sopstveni server u obliku embed poruke\ntotalad: masovna verzija reklame\nclear, help: servisne komande konzole\ndev: skrivena uskršnja jaja sa informacijama o autoru\nStatus naloga (online, idle, dnd, invisible) menja se preko konfiguracije.\nRevolution Chat Viewer. Ispisuje u konzolu sve poruke koje nalog vidi, uključujući privatne. Za svaku navodi server, kanal i autora. Ispis se može ograničiti na jedan kanal po ID-u.\nOther Person Chat. Sve što se unese u konzolu šalje se u izabrani kanal u ime naloga. U suštini, konzolni messenger iznad Discord-a.\nRevolution Fun Remover. Briše svaku poruku koja se pojavi u četu, osim jedne tajne fraze. Bio je to eksperiment sa automatskom moderacijom.\nRevolution Permission Checker. Na komandu prolazi kroz oko 30 serverskih dozvola (administrator, ban, kick, upravljanje kanalima i ulogama, glasovne dozvole i druge) i u konzoli zeleno i crveno ispisuje koje od njih nalog ima.",
          "en": "The project is split into independent modules, and each one is launched by a separate .exe launcher:\nRevolution (main module). Loads commands dynamically from the cmd/ folder and runs them by a prefix set in the config. Commands:\nban, kick: banning and kicking members, with a check of the account's permissions on the server\naddrole: gives yourself the role specified in the config\nkeyfordel: deletes a text channel\nsid: shows a channel's ID\nad: a nicely formatted advertisement for your server as an embed\ntotalad: a mass version of the advertisement\nclear, help: service console commands\ndev: a hidden easter egg with information about the author\nThe account status (online, idle, dnd, invisible) is changed through the config.\nRevolution Chat Viewer. Prints to the console every message the account can see, including private ones. For each one it shows the server, channel and author. The output can be limited to one channel by its ID.\nOther Person Chat. Everything typed into the console is sent to the chosen channel on behalf of the account. In effect, a console messenger on top of Discord.\nRevolution Fun Remover. Deletes every message that appears in the chat, except one secret phrase. It was an experiment with automatic moderation.\nRevolution Permission Checker. On command, goes through about 30 server permissions (administrator, ban, kick, managing channels and roles, voice permissions and others) and prints in green and red which of them the account has."
        }
      },
      {
        "type": "text",
        "heading": {
          "ru": "Технические детали",
          "sr": "Tehnički detalji",
          "en": "Technical details"
        },
        "text": {
          "ru": "Node.js и discord.js v11 (события ready и message, RichEmbed)\nДинамическая подгрузка команд из директории через fs.readdir и Collection\nКонфигурация через JSON-файлы (токен, префикс, роль, ссылка на сервер, статус, ID каналов)\nПроверка прав через hasPermission\nЦветной консольный вывод через ANSI-последовательности\nНесколько независимых процессов вместо единой архитектуры\nСамодельная защита от запуска на определённом сервере (бесконечный цикл с сообщением в консоль)",
          "sr": "Node.js i discord.js v11 (događaji ready i message, RichEmbed)\nDinamičko učitavanje komandi iz direktorijuma preko fs.readdir i Collection\nKonfiguracija preko JSON fajlova (token, prefiks, uloga, link ka serveru, status, ID kanala)\nProvera dozvola preko hasPermission\nObojen ispis u konzoli preko ANSI sekvenci\nViše nezavisnih procesa umesto jedinstvene arhitekture\nSamopravljena zaštita od pokretanja na određenom serveru (beskonačna petlja sa porukom u konzoli)",
          "en": "Node.js and discord.js v11 (ready and message events, RichEmbed)\nDynamic loading of commands from a directory with fs.readdir and Collection\nConfiguration through JSON files (token, prefix, role, server link, status, channel IDs)\nPermission checks with hasPermission\nColored console output with ANSI sequences\nSeveral independent processes instead of a single architecture\nA homemade protection against running on a particular server (an infinite loop with a message in the console)"
        }
      },
      {
        "type": "text",
        "heading": {
          "ru": "Что получилось слабо",
          "sr": "Šta nije dobro ispalo",
          "en": "What didn't work well"
        },
        "text": {
          "ru": "Это мой первый проект, и честно говоря, он слабый:\nКоманды может запускать любой пользователь в чате, а не только владелец аккаунта: нет проверки авторства.\nКод дублируется. Например, totalad повторяет один и тот же вызов 25 раз вместо цикла.\nПроверка прав написана копипастой отдельными блоками, хотя хватило бы массива.\n«Защита» держится на хаках, а ключ лежит прямо в коде.\nОбратная связь о результате команд выводится только в консоль, пользователь в Discord её не видит.\nНет общей структуры и логирования, а токены и ID лежат в json рядом с кодом.",
          "sr": "Ovo mi je prvi projekat i, iskreno, slab je:\nKomande može da pokrene bilo koji korisnik u četu, a ne samo vlasnik naloga: nema provere autorstva.\nKod je dupliran. Na primer, totalad ponavlja isti poziv 25 puta umesto petlje.\nProvera dozvola je prepisana kao zasebni blokovi, iako bi bio dovoljan niz.\n„Zaštita“ se oslanja na trikove, a ključ leži direktno u kodu.\nPovratna informacija o rezultatu komandi ispisuje se samo u konzoli, korisnik je ne vidi u Discord-u.\nNema zajedničke strukture ni logovanja, a tokeni i ID-jevi su u JSON fajlovima pored koda.",
          "en": "This is my first project, and honestly, it is weak:\nAny user in the chat can run commands, not just the account owner: there is no authorship check.\nThe code is duplicated. For example, totalad repeats the same call 25 times instead of using a loop.\nThe permission check is copy-pasted as separate blocks, although an array would have been enough.\nThe \"protection\" relies on hacks, and the key sits right in the code.\nFeedback on command results is printed only to the console; the user doesn't see it in Discord.\nThere is no common structure or logging, and tokens and IDs are kept in JSON files next to the code."
        }
      },
      {
        "type": "text",
        "heading": {
          "ru": "Чему научился",
          "sr": "Čemu sam naučio",
          "en": "What I learned"
        },
        "text": {
          "ru": "Работе с Discord API: события, сообщения, эмбеды, права и роли\nСтруктуре Node.js-проекта и динамической загрузке модулей\nТому, как работают токены авторизации, и почему их нельзя хранить в открытом виде\nЧто такое правила платформы и почему обход ограничений нельзя считать нормальной практикой\nКак не надо писать код: этот проект стал для меня точкой отсчёта",
          "sr": "Rad sa Discord API-jem: događaji, poruke, embed-ovi, dozvole i uloge\nStrukturi Node.js projekta i dinamičkom učitavanju modula\nKako rade tokeni za autorizaciju i zašto se ne smeju čuvati u otvorenom obliku\nŠta su pravila platforme i zašto se zaobilaženje ograničenja ne može smatrati normalnom praksom\nKako ne treba pisati kod: ovaj projekat mi je bio polazna tačka",
          "en": "Working with the Discord API: events, messages, embeds, permissions and roles\nThe structure of a Node.js project and dynamic loading of modules\nHow authorization tokens work, and why they must not be stored in plain text\nWhat platform rules are, and why bypassing restrictions can't be considered normal practice\nHow not to write code: this project became my starting point"
        }
      },
      {
        "type": "text",
        "heading": {
          "ru": "Если делать сегодня",
          "sr": "Kad bih ga pravio danas",
          "en": "If I built it today"
        },
        "text": {
          "ru": "Я бы написал нормального бота на актуальной версии discord.js со слэш-командами и официальным токеном бота. Права проверялись бы через ролевую модель, а конфиг и секреты лежали бы в .env. Код был бы разбит на общие утилиты без копипасты и покрыт тестами.",
          "sr": "Napisao bih pravog bota na aktuelnoj verziji discord.js sa slash komandama i zvaničnim tokenom bot naloga. Dozvole bi se proveravale preko modela uloga, a konfiguracija i tajne bi bile u .env fajlu. Kod bi bio podeljen na zajedničke pomoćne funkcije bez dupliranja i pokriven testovima.",
          "en": "I would write a proper bot on a current version of discord.js with slash commands and an official bot token. Permissions would be checked with a role model, and the config and secrets would live in a .env file. The code would be split into shared utilities without duplication and covered with tests."
        }
      }
    ],
    "cardId": "",
    "featured": false,
    "href": "",
    "newTab": false,
    "links": []
  },
  {
    "id": "project-webregistry",
    "year": "2026",
    "tags": [
      "web",
      "backend"
    ],
    "cover": "assets/uploads/works/webregistry/1.webp",
    "title": {
      "ru": "WebRegistry",
      "sr": "WebRegistry",
      "en": "WebRegistry"
    },
    "summary": {
      "ru": "Веб реестр для работы с поступающими заявками в плоттерной",
      "sr": "Veb-registar za rad sa pristiglim zahtevima u ploterskoj štampariji",
      "en": "Web Register for Managing Incoming Plotter Requests"
    },
    "blocks": [
      {
        "type": "carousel",
        "items": [
          {
            "src": "assets/uploads/works/webregistry/1.webp",
            "caption": {}
          },
          {
            "src": "assets/uploads/works/webregistry/2.webp",
            "caption": {}
          },
          {
            "src": "assets/uploads/works/webregistry/3.webp",
            "caption": {}
          }
        ]
      },
      {
        "type": "text",
        "heading": {},
        "text": {
          "ru": "Локальный веб-реестр заявок для плоттерной · FastAPI, SQLite, vanilla JS · личная разработка для Национальной Транспортной Ассоциации\nWebRegistry заменяет таблицу Excel, которой раньше пользовались в плоттерной. Это локальное веб-приложение: сервер на FastAPI работает с базой SQLite, интерфейс открывается в браузере. Внешние зависимости минимальны: шрифты из Google Fonts, иконки из Tabler Icons и библиотека XLSX для импорта. Всё остальное работает на локальной машине.",
          "sr": "Lokalni veb-registar zahteva za ploterski odeljenje · FastAPI, SQLite, vanilla JS · lični projekat za Nacionalnu transportnu asocijaciju\nWebRegistry zamenjuje Excel tabelu koju je ploterska radionica ranije koristila. To je lokalna veb aplikacija: FastAPI server radi sa SQLite bazom, a interfejs se otvara u brauzeru. Spoljne zavisnosti su minimalne: fontovi sa Google Fonts, ikone iz Tabler Icons i XLSX biblioteka za uvoz. Sve ostalo radi na lokalnoj mašini.",
          "en": "Local web register of incoming requests for the plotter shop · FastAPI, SQLite, vanilla JS · personal project for the National Transport Association\nWebRegistry replaces the Excel table the plotter shop used before. It is a local web application: a FastAPI server works with an SQLite database, and the interface opens in the browser. External dependencies are minimal: fonts from Google Fonts, icons from Tabler Icons and the XLSX library for import. Everything else runs on the local machine."
        }
      },
      {
        "type": "text",
        "heading": {
          "ru": "Что умеет система",
          "sr": "Šta sistem može",
          "en": "What the system does"
        },
        "text": {
          "ru": "Реестр заявок. Каждая заявка хранит подразделение, заказчика, тип, количество, дату поступления, внешний номер, техническое задание и комментарии. Заявка может содержать несколько позиций с типом и количеством. Номер заявки в системе подбирается автоматически, и её можно найти по номеру.\nПроизводственные этапы. У заявки есть три отдельных статуса: согласование, печать и резка. Для каждого задан набор значений: «в работе», «готово», «согласование», «ТМГ». Если хотя бы один этап стоит в статусе ТМГ, заявка помечается отдельно.\nСрочность. Заявка может иметь дату срочности и комментарий к ней. Отдельная панель показывает открытые срочные заявки и выделяет просроченные.\nЗакрытие заявок. Заявку можно закрыть и снова открыть. Закрытая заявка автоматически получает дату и пользователя, который её закрыл. Массово закрывать и удалять заявки тоже можно, но только при наличии нужных прав.\nПоиск, фильтры и таблица. Есть поиск по заявкам, фильтры, сортировка и постраничный вывод таблицы. Постраничность реализована на клиенте.\nГрафики. Модальное окно строит линейный график по месяцам. Можно выбрать метрику: количество заявок, суммарное количество изделий, открытые, закрытые или срочные.\nИмпорт и экспорт Excel. Заявки можно импортировать из таблицы Excel: скрипт распознаёт заголовки колонок и их варианты написания. Экспорт выполняется в фоне, готовый файл можно скачать.\nПользователи и права. Первый зарегистрированный пользователь становится администратором. Остальным доступны роли с набором прав: просмотр, создание, редактирование, удаление и закрытие заявок, управление пользователями, ролями и справочниками, просмотр журнала действий, работа с базой и импорт и экспорт. Пароли хранятся в виде PBKDF2-хэша, вход выполняется по сессионному токену со сроком 30 дней.\nЖурнал действий. Все изменения записываются в журнал аудита.\nАдминистрирование базы. Есть сводка по базе, очистка (VACUUM), контрольные точки с возможностью восстановления и автоматические резервные копии перед импортом.\nОбновления в реальном времени. Изменения передаются по WebSocket, поэтому открытые у других сотрудников таблицы обновляются сами. Для ключевых действий подключены звуковые уведомления.",
          "sr": "Registar zahteva. Svaki zahtev čuva odeljenje, naručioca, tip, količinu, datum prijema, spoljni broj, tehnički zadatak i komentare. Zahtev može imati više stavki sa tipom i količinom. Broj zahteva u sistemu se dodeljuje automatski, a zahtev se može pronaći po broju.\nProizvodne faze. Zahtev ima tri odvojena statusa: saglasavanje, štampa i sečenje. Za svaki je zadat skup vrednosti: „u radu“, „gotovo“, „saglasavanje“, „TMG“. Ako je bar jedna faza u statusu TMG, zahtev se posebno označava.\nHitnost. Zahtev može imati datum hitnosti i komentar uz njega. Poseban panel prikazuje otvorene hitne zahteve i ističe one kojima je istekao rok.\nZatvaranje zahteva. Zahtev se može zatvoriti i ponovo otvoriti. Zatvoreni zahtev automatski dobija datum i korisnika koji ga je zatvorio. Zahteve je moguće zatvarati i brisati u grupi, ali samo uz odgovarajuća prava.\nPretraga, filteri i tabela. Postoje pretraga zahteva, filteri, sortiranje i prikaz tabele po stranicama. Paginacija je realizovana na klijentu.\nGrafikoni. Modalni prozor pravi linijski grafikon po mesecima. Može se izabrati metrika: broj zahteva, ukupan broj proizvoda, otvoreni, zatvoreni ili hitni zahtevi.\nUvoz i izvoz Excel-a. Zahtevi se mogu uvesti iz Excel tabele: skripta prepoznaje nazive kolona i njihove varijante pisanja. Izvoz se izvodi u pozadini, a gotov fajl se može preuzeti.\nKorisnici i prava. Prvi registrovani korisnik postaje administrator. Ostalima su dostupne uloge sa skupom prava: pregled, kreiranje, izmena, brisanje i zatvaranje zahteva, upravljanje korisnicima, ulogama i šiframnicima, pregled dnevnika aktivnosti, rad sa bazom, uvoz i izvoz. Lozinke se čuvaju kao PBKDF2 heš, a prijava se obavlja sesijskim tokenom koji važi 30 dana.\nDnevnik aktivnosti. Sve izmene se beleže u dnevnik revizije.\nAdministracija baze. Postoji pregled baze, čišćenje (VACUUM), kontrolne tačke sa mogućnošću vraćanja i automatske rezervne kopije pre uvoza.\nAžuriranje u realnom vremenu. Izmene se prenose preko WebSocket-a, pa se tabele otvorene kod drugih zaposlenih same ažuriraju. Za ključne radnje su uključena zvučna obaveštenja.",
          "en": "Request register. Each request stores the department, the client, the type, the quantity, the receipt date, the external number, the technical specification and comments. A request can contain several items, each with a type and a quantity. The request number is assigned automatically, and a request can be found by its number.\nProduction stages. A request has three separate statuses: approval, printing and cutting. Each has a set of values: \"in progress\", \"done\", \"approval\", \"TMG\". If at least one stage is in the TMG status, the request is marked separately.\nUrgency. A request can have an urgency date and a comment about it. A separate panel shows open urgent requests and highlights overdue ones.\nClosing requests. A request can be closed and reopened. A closed request automatically gets the date and the user who closed it. Requests can also be closed or deleted in bulk, but only with the right permissions.\nSearch, filters and table. There is search across requests, filters, sorting and paginated table output. Pagination is implemented on the client.\nCharts. A modal window builds a monthly line chart. You can choose the metric: number of requests, total number of products, open, closed or urgent requests.\nExcel import and export. Requests can be imported from an Excel table: the script recognizes column headers and their spelling variants. Export runs in the background, and the finished file can be downloaded.\nUsers and permissions. The first registered user becomes the administrator. Other users get roles with a set of permissions: viewing, creating, editing, deleting and closing requests, managing users, roles and reference data, viewing the activity log, working with the database, and import and export. Passwords are stored as a PBKDF2 hash, and sign-in uses a session token valid for 30 days.\nActivity log. All changes are recorded in the audit log.\nDatabase administration. There is a database overview, cleanup (VACUUM), restore points and automatic backups before import.\nReal-time updates. Changes are pushed over WebSocket, so tables open on other employees' screens update automatically. Sound notifications are enabled for key actions."
        }
      },
      {
        "type": "text",
        "heading": {
          "ru": "Технические детали",
          "sr": "Tehnički detalji",
          "en": "Technical details"
        },
        "text": {
          "ru": "Backend: FastAPI, Pydantic, SQLite в режиме WAL, openpyxl для Excel, uvicorn\nСтруктура: маршруты, репозитории (отдельно для основной работы и для администрирования), схемы валидации, блокировки длительных операций, логирование\nFrontend: HTML, CSS и JavaScript без фреймворков. Код разбит на модули: API-клиенты, состояние, модальные окна, таблица, контекстное меню, тултипы\nДля запуска нужны Python, FastAPI и uvicorn; установка описана в README",
          "sr": "Backend: FastAPI, Pydantic, SQLite u WAL režimu, openpyxl za Excel, uvicorn\nStruktura: rute, repozitorijumi (zasebno za osnovni rad i za administraciju), šeme validacije, zaključavanje dugotrajnih operacija, logovanje\nFrontend: HTML, CSS i JavaScript bez framework-a. Kod je podeljen na module: API klijenti, stanje, modalni prozori, tabela, kontekstni meni, tooltip-ovi\nZa pokretanje su potrebni Python, FastAPI i uvicorn; instalacija je opisana u README-u",
          "en": "Backend: FastAPI, Pydantic, SQLite in WAL mode, openpyxl for Excel, uvicorn\nStructure: routes, repositories (separate ones for core work and for administration), validation schemas, locking for long operations, logging\nFrontend: HTML, CSS and JavaScript without frameworks. The code is split into modules: API clients, state, modal windows, table, context menu, tooltips\nTo run it you need Python, FastAPI and uvicorn; installation is described in the README"
        }
      },
      {
        "type": "text",
        "heading": {
          "ru": "Что я сделал",
          "sr": "Šta sam uradio",
          "en": "What I did"
        },
        "text": {
          "ru": "Проект разработан мной лично. Я писал и backend, и frontend, проектировал схему базы, систему ролей и производственные статусы, а также импорт и экспорт Excel. Интерфейс сделан без фреймворков, а разметка и стили подогнаны под работу за рабочим столом.",
          "sr": "Projekat sam razvio lično. Pisao sam i backend i frontend, projektovao šemu baze, sistem uloga i proizvodne statuse, kao i uvoz i izvoz Excel-a. Interfejs je napravljen bez framework-a, a raspored i stilovi prilagođeni su radu na radnoj stanici.",
          "en": "I developed the project myself. I wrote both the backend and the frontend, designed the database schema, the role system and the production statuses, as well as the Excel import and export. The interface is built without frameworks, and the layout and styles are tuned for desktop work."
        }
      }
    ],
    "featured": true,
    "cardId": "",
    "href": "",
    "newTab": false,
    "links": []
  },
  {
    "id": "project-video-editing",
    "year": "",
    "tags": [
      "video",
      "motion"
    ],
    "cover": "",
    "title": {
      "ru": "Видеомонтаж",
      "sr": "Video montaža",
      "en": "Video editing"
    },
    "summary": {
      "ru": "Видео для собственного YouTube-канала: монтаж, цветокоррекция, звук и обложки.",
      "sr": "Video za sopstveni YouTube kanal: montaža, korekcija boje, zvuk i naslovne slike.",
      "en": "Videos for my own YouTube channel: editing, color grading, sound and thumbnails."
    },
    "blocks": [
      {
        "type": "text",
        "heading": {},
        "text": {
          "ru": "YouTube · монтаж, цветокоррекция, работа со звуком, обложки · несколько лет практики\nРаздел о видео, которое я делал для собственного YouTube-канала на протяжении нескольких лет. Этот опыт сформировал мои навыки работы с динамикой кадра, ритмом и визуальным стилем. Работа шла полным циклом: от записи геймплея до финального экспорта и оформления обложек.",
          "sr": "YouTube · montaža, korekcija boje, rad sa zvukom, naslovne slike · nekoliko godina prakse\nDeo o videima koje sam radio za sopstveni YouTube kanal tokom nekoliko godina. Ovo iskustvo je oblikovalo moje veštine rada sa dinamikom kadra, ritmom i vizuelnim stilom. Rad je išao kroz ceo ciklus: od snimanja igranja do finalnog izvoza i izrade naslovnih slika.",
          "en": "YouTube · editing, color grading, sound work, thumbnails · several years of practice\nA section about the videos I made for my own YouTube channel over several years. This experience shaped my skills in working with frame dynamics, rhythm and visual style. The work covered the full cycle: from recording gameplay to the final export and thumbnail design."
        }
      },
      {
        "type": "text",
        "heading": {
          "ru": "Что я делал",
          "sr": "Šta sam radio",
          "en": "What I did"
        },
        "text": {
          "ru": "Запись. Снимал игровой контент для последующего монтажа.\nСтруктурирование и нарезка. Разбивал ролики на логические фрагменты, отбирал сильные моменты и собирал из них последовательный видеоряд, понятный зрителю.\nМонтаж с акцентом на ритм. Синхронизировал движения и переходы с музыкой, создавал плавные связки между сценами и удерживал темп ролика.\nЦветокоррекция. Настраивал яркость, контраст и насыщенность, убирал шумы и приводил картинку к единому визуальному стилю.\nГрафика и анимации. Добавлял UI-элементы, подписи, всплывающие подсказки и лёгкие motion-эффекты, которые помогали пояснять происходящее и разнообразить картинку.\nОбложки. Создавал кликабельные обложки под каждый ролик: композиция, цвет, крупные акценты, типографика и стилизация под тему конкретного видео.",
          "sr": "Snimanje. Snimao sam sadržaj igre za kasniju montažu.\nStruktuiranje i sečenje. Delio sam videe na logičke fragmente, birao jake trenutke i od njih sastavljao niz koji je gledaocu jasan.\nMontaža sa naglaskom na ritam. Sinhronizovao sam pokrete i prelaze sa muzikom, pravio glatke veze između scena i držao tempo videa.\nKorekcija boje. Podešavao sam svetlinu, kontrast i zasićenost, uklanjao šum i dovodio sliku do jedinstvenog vizuelnog stila.\nGrafika i animacije. Dodavao sam UI elemente, natpise, iskačuće napomene i lake motion efekte koji pomažu da se objasni šta se dešava i unose raznolikost u sliku.\nNaslovne slike. Pravio sam upečatljive naslovne slike za svaki video: kompoziciju, boju, jasne akcente, tipografiju i stilizaciju prema temi konkretnog videa.",
          "en": "Recording. I filmed game content for later editing.\nStructuring and cutting. I split videos into logical fragments, picked the strong moments and assembled them into a sequence that makes sense to the viewer.\nEditing with a focus on rhythm. I synced movements and transitions with music, built smooth links between scenes and kept the pace of the video.\nColor grading. I adjusted brightness, contrast and saturation, removed noise and brought the picture to a single visual style.\nGraphics and animation. I added UI elements, captions, pop-up hints and light motion effects that help explain what is happening and add variety to the picture.\nThumbnails. I made eye-catching thumbnails for each video: composition, color, bold accents, typography and styling matched to the theme of the specific video."
        }
      },
      {
        "type": "text",
        "heading": {
          "ru": "Инструменты",
          "sr": "Alati",
          "en": "Tools"
        },
        "text": {
          "ru": "After Effects, Premiere Pro, Photoshop, Illustrator.",
          "sr": "After Effects, Premiere Pro, Photoshop, Illustrator.",
          "en": "After Effects, Premiere Pro, Photoshop, Illustrator."
        }
      },
      {
        "type": "text",
        "heading": {
          "ru": "Результат",
          "sr": "Rezultat",
          "en": "Result"
        },
        "text": {
          "ru": "Финальные версии роликов опубликованы на YouTube. Исходные проекты утрачены при замене ноутбука, поэтому портфолио опирается на опубликованные видео.",
          "sr": "Finalne verzije videa objavljene su na YouTube-u. Originalni projekti su izgubljeni kad sam menjao laptop, pa se portfolio oslanja na objavljene videe.",
          "en": "The final versions of the videos are published on YouTube. The original project files were lost when I replaced my laptop, so the portfolio relies on the published videos."
        }
      }
    ],
    "cardId": "",
    "featured": false,
    "href": "",
    "newTab": false,
    "links": []
  },
  {
    "id": "project-ai",
    "year": "",
    "tags": [
      "ai",
      "graphic"
    ],
    "cover": "assets/uploads/works/ai/1.webp",
    "title": {
      "ru": "Работа с искусственным интеллектом",
      "sr": "Rad sa veštačkom inteligencijom",
      "en": "Working with AI"
    },
    "summary": {
      "ru": "Генерация изображений в ComfyUI, локальный запуск моделей и встраивание ИИ в дизайн-проекты.",
      "sr": "Generisanje slika u ComfyUI-ju, lokalno pokretanje modela i uključivanje AI-ja u dizajn projekte.",
      "en": "Image generation in ComfyUI, local model deployment and AI integrated into design projects."
    },
    "blocks": [
      {
        "type": "text",
        "heading": {},
        "text": {
          "ru": "Генерация изображений · ComfyUI · локальный запуск моделей · промт-инжиниринг\nРаздел посвящён практической работе с нейросетями: генерации изображений, запуску моделей на собственном оборудовании и встраиванию ИИ в дизайн-проекты. Главная задача — не просто пользоваться готовыми сервисами, а настроить рабочий процесс так, чтобы результат был стабильным и предсказуемым.",
          "sr": "Generisanje slika · ComfyUI · lokalno pokretanje modela · prompt inženjering\nDeo o praktičnom radu sa neuronskim mrežama: generisanje slika, pokretanje modela na sopstvenom hardveru i ugrađivanje AI-ja u dizajn projekte. Glavni cilj nije samo korišćenje gotovih servisa, nego podešavanje radnog procesa tako da rezultat bude stabilan i predvidiv.",
          "en": "Image generation · ComfyUI · local model deployment · prompt engineering\nA section about practical work with neural networks: image generation, running models on my own hardware and building AI into design projects. The main goal is not just to use ready-made services, but to set up a workflow where the result is stable and predictable."
        }
      },
      {
        "type": "carousel",
        "items": [
          {
            "src": "assets/uploads/works/ai/1.webp",
            "caption": {}
          },
          {
            "src": "assets/uploads/works/ai/2.webp",
            "caption": {}
          },
          {
            "src": "assets/uploads/works/ai/3.webp",
            "caption": {}
          }
        ]
      },
      {
        "type": "text",
        "heading": {
          "ru": "Что я делаю",
          "sr": "Šta radim",
          "en": "What I do"
        },
        "text": {
          "ru": "Локальный запуск моделей. Разворачиваю модели на своём железе, настраиваю окружение и зависимости, оптимизирую работу системы и добиваюсь стабильного рендера без сбоев.\nПайплайны в ComfyUI. Собираю графовые цепочки для генерации: подключаю upscale-модули, постобработку, LoRA и ControlNet.\nПромт-инжиниринг. Составляю текстовые запросы, подбираю стили и технические параметры, чтобы результат повторялся от запуска к запуску.\nДоработка после генерации. Применяю апскейл, корректирую цвет, убираю шумы, дорабатываю детали и композицию в Photoshop.\nИнтеграция ИИ в проекты. Использую нейросети как часть UX-концепций: генерацию контента, динамические изображения, ассеты для сайтов и визуальные решения. Например, ИИ-модуль дипломного проекта Pulse&Pistons работает именно с этим подходом.\nЭксперименты. Пробую разные архитектуры и подходы, генерацию 3D и аниме-стилистику, ищу новые решения для визуалов и дизайна.",
          "sr": "Lokalno pokretanje modela. Postavljam modele na sopstvenom hardveru, podešavam okruženje i zavisnosti, optimizujem sistem i postižem stabilan render bez grešaka.\nPipeline-ovi u ComfyUI-ju. Pravim grafove čvorova za generisanje: povezujem upscale module, postprodukciju, LoRA i ControlNet.\nPrompt inženjering. Pišem tekstualne upite i biram stilove i tehničke parametre da se rezultat ponavlja iz pokretanja u pokretanje.\nDorada posle generisanja. Primenjujem upscale, korigujem boju, uklanjam šum i dorađujem detalje i kompoziciju u Photoshop-u.\nIntegracija AI-ja u projekte. Koristim neuronske mreže kao deo UX koncepata: generisanje sadržaja, dinamičke slike, resurse za sajtove i vizuelna rešenja. Na primer, AI modul diplomskog projekta Pulse&Pistons radi upravo po ovom pristupu.\nEksperimenti. Isprobavam različite arhitekture i pristupe, generisanje 3D sadržaja i anime stilistiku, i tražim nova rešenja za vizuale i dizajn.",
          "en": "Local model deployment. I set up models on my own hardware, configure the environment and dependencies, optimize the system and achieve stable rendering without failures.\nPipelines in ComfyUI. I build node graphs for generation: I connect upscale modules, post-processing, LoRA and ControlNet.\nPrompt engineering. I write text prompts and choose styles and technical parameters so the result repeats from run to run.\nPost-generation work. I apply upscaling, correct color, remove noise and refine details and composition in Photoshop.\nAI integration into projects. I use neural networks as part of UX concepts: content generation, dynamic images, assets for websites and visual solutions. For example, the AI module of the Pulse&Pistons diploma project works exactly this way.\nExperiments. I try different architectures and approaches, 3D generation and anime style, and look for new solutions for visuals and design."
        }
      },
      {
        "type": "text",
        "heading": {
          "ru": "Инструменты",
          "sr": "Alati",
          "en": "Tools"
        },
        "text": {
          "ru": "ComfyUI, SDXL, LoRA, ControlNet, Photoshop, AI-upscale модули.",
          "sr": "ComfyUI, SDXL, LoRA, ControlNet, Photoshop, AI upscale moduli.",
          "en": "ComfyUI, SDXL, LoRA, ControlNet, Photoshop, AI upscale modules."
        }
      }
    ],
    "cardId": "",
    "featured": false,
    "href": "",
    "newTab": false,
    "links": []
  },
  {
    "id": "project-university-department",
    "year": "2022 – 2024",
    "tags": [
      "graphic"
    ],
    "cover": "assets/uploads/works/university-department/1.webp",
    "title": {
      "ru": "Работа на кафедре",
      "sr": "Rad na katedri",
      "en": "Department work"
    },
    "summary": {
      "ru": "Визуалы для факультета: афиши, посты для соцсетей, иллюстрации деканата.",
      "sr": "Vizuali za fakultet: plakati, objave za društvene mreže i ilustracije za dekanat.",
      "en": "Visuals for the faculty: posters, social media posts and illustrations for the dean's office."
    },
    "blocks": [
      {
        "type": "text",
        "heading": {},
        "text": {
          "ru": "Графический дизайн, иллюстрации, визуалы для соцсетей · 2022–2024\nРабота на кафедре университета: я занимался визуальным оформлением факультета. Создавал графические материалы для мероприятий, карточки и баннеры, элементы айдентики и небольшой видеоконтент для соцсетей и внутренних задач кафедры.",
          "sr": "Grafički dizajn, ilustracija, vizuali za društvene mreže · 2022–2024\nRad na katedri univerziteta: bio sam zadužen za vizuelno oblikovanje fakulteta. Pravio sam grafički materijal za događaje, kartice i bannere, elemente identiteta i kratak video sadržaj za društvene mreže i interne potrebe katedre.",
          "en": "Graphic design, illustration, social media visuals · 2022–2024\nWork for the university department: I was responsible for the visual design of the faculty. I created graphic materials for events, cards and banners, identity elements and short video content for social media and the department's internal needs."
        }
      },
      {
        "type": "carousel",
        "items": [
          {
            "src": "assets/uploads/works/university-department/1.webp",
            "caption": {}
          },
          {
            "src": "assets/uploads/works/university-department/2.webp",
            "caption": {}
          },
          {
            "src": "assets/uploads/works/university-department/3.webp",
            "caption": {}
          },
          {
            "src": "assets/uploads/works/university-department/4.webp",
            "caption": {}
          },
          {
            "src": "assets/uploads/works/university-department/5.webp",
            "caption": {}
          },
          {
            "src": "assets/uploads/works/university-department/6.webp",
            "caption": {}
          },
          {
            "src": "assets/uploads/works/university-department/7.webp",
            "caption": {}
          }
        ]
      },
      {
        "type": "text",
        "heading": {
          "ru": "Что я делал",
          "sr": "Šta sam radio",
          "en": "What I did"
        },
        "text": {
          "ru": "Графические макеты для мероприятий и новостей. Разрабатывал визуалы для анонсов, афиш, объявлений и внутренних информационных поводов факультета.\nВизуалы для соцсетей факультета. Готовил карточки, обложки и посты в едином стиле для ленты.\nИллюстрации для деканата. Создал серию авторских иллюстраций сотрудников и графические элементы, которые использовались в оформлении факультета.",
          "sr": "Grafički maketi za događaje i vesti. Razvijao sam vizuale za najave, plakate, obaveštenja i interne informacije fakulteta.\nVizuali za društvene mreže fakulteta. Pripremao sam kartice, naslovne slike i objave u jedinstvenom stilu za feed.\nIlustracije za dekanat. Napravio sam seriju autorskih ilustracija zaposlenih i grafičke elemente koji su korišćeni u oblikovanju fakulteta.",
          "en": "Graphic layouts for events and news. I developed visuals for announcements, posters, notices and internal information items of the faculty.\nVisuals for the faculty's social media. I prepared cards, covers and posts in a unified style for the feed.\nIllustrations for the dean's office. I created a series of original illustrations of staff members and graphic elements used in the faculty's design."
        }
      },
      {
        "type": "text",
        "heading": {
          "ru": "Моя роль",
          "sr": "Moja uloga",
          "en": "My role"
        },
        "text": {
          "ru": "Графический дизайн\nИллюстрации\nАдаптация материалов под соцсети",
          "sr": "Grafički dizajn\nIlustracija\nPrilagođavanje materijala za društvene mreže",
          "en": "Graphic design\nIllustration\nAdapting materials for social media"
        }
      },
      {
        "type": "text",
        "heading": {
          "ru": "Инструменты",
          "sr": "Alati",
          "en": "Tools"
        },
        "text": {
          "ru": "Illustrator, Photoshop.",
          "sr": "Illustrator, Photoshop.",
          "en": "Illustrator, Photoshop."
        }
      }
    ],
    "cardId": "",
    "featured": false,
    "href": "",
    "newTab": false,
    "links": []
  },
  {
    "id": "project-razlom",
    "year": "",
    "tags": [
      "video"
    ],
    "cover": "assets/uploads/works/razlom/poster.jpg",
    "title": {
      "ru": "Разлом",
      "sr": "Razlom",
      "en": "Razlom"
    },
    "summary": {
      "ru": "Незавершённый немой сериал об одиночестве и внутреннем мире героя. Остановлен на четырёх сериях.",
      "sr": "Nedovršena nemi serija o usamljenosti i unutrašnjem svetu junaka. Zaustavljena posle četiri epizode.",
      "en": "An unfinished silent series about loneliness and the hero's inner world. Stopped after four episodes."
    },
    "blocks": [
      {
        "type": "text",
        "heading": {},
        "text": {
          "ru": "Немой сериал · атмосферная драма · незавершённый проект\nСериал без слов о герое, который осознаёт свой поступок и пытается выбраться из собственного внутреннего мира. Этот мир олицетворяет одиночество и душевную тяжесть. Герой ищет близкого человека, но не дожидается его и решает уйти. Позже он понимает, что ошибся: в дверь стучит тот, кто повесил картину у его кровати и принёс новое стекло, чтобы уберечь героя от беды.\nЗамысел опирается на атмосферу, похожую на Backrooms: пустые, бесконечные пространства, в которых сюжет рассказывается через пространство и ощущение, а не диалоги. Главный вопрос проекта — как альтернативный мир после смерти будет восприниматься самим героем.",
          "sr": "Nemi serijal · atmosferska drama · nedovršen projekat\nSerija bez reči o junaku koji shvata šta je uradio i pokušava da izađe iz sopstvenog unutrašnjeg sveta. Taj svet predstavlja usamljenost i emotivnu težinu. Junak traži bliske ljude, ali ne čeka ih i odlučuje da ode. Kasnije shvata da je pogrešio: na vrata kuca neko ko je okačio sliku iznad njegovog kreveta i doneo novo staklo da ga zaštiti od nevolje.\nZamisao se oslanja na atmosferu sličnu Backrooms-u: prazne, beskrajne prostore u kojima se priča ispričava kroz prostor i osećaj, a ne kroz dijaloge. Glavno pitanje projekta je kako će alternativni svet posle smrti doživeti sam junak.",
          "en": "Silent series · atmospheric drama · unfinished project\nA series without words about a hero who realizes what he has done and tries to escape his own inner world. That world stands for loneliness and emotional heaviness. The hero looks for a close person but does not wait for them and decides to leave. Later he realizes he was wrong: someone is knocking at the door, the person who hung the picture above his bed and brought a new pane of glass to protect him from harm.\nThe concept draws on an atmosphere similar to the Backrooms: empty, endless spaces where the story is told through space and feeling rather than dialogue. The central question of the project is how the alternative world after death will be perceived by the hero himself."
        }
      },
      {
        "type": "embed",
        "url": "https://vkvideo.ru/video-230834796_456239023",
        "caption": {}
      },
      {
        "type": "text",
        "heading": {
          "ru": "Что было задумано",
          "sr": "Šta je bilo zamišljeno",
          "en": "What was planned"
        },
        "text": {
          "ru": "Повествование без диалогов: всё держится на кадре, свете, темпе и звуке.\nНагнетающий сюжет, который постепенно раскрывает состояние героя.\nСцены в пространстве, которое отражает одиночество и тяжесть.\nФинальный поворот, в котором герой осознаёт, что рядом были люди, которые о нём заботились.",
          "sr": "Pripovedanje bez dijaloga: sve počiva na kadru, svetlu, tempu i zvuku.\nNapeta radnja koja postepeno otkriva stanje junaka.\nScene u prostoru koji odražava usamljenost i težinu.\nFinalni obrt u kojem junak shvata da su u blizini bili ljudi koji su se brinuli o njemu.",
          "en": "Storytelling without dialogue: everything rests on the frame, light, pace and sound.\nA gripping plot that gradually reveals the hero's state.\nScenes in a space that reflects loneliness and heaviness.\nA final twist in which the hero realizes that there were people nearby who cared about him."
        }
      },
      {
        "type": "text",
        "heading": {
          "ru": "Статус",
          "sr": "Status",
          "en": "Status"
        },
        "text": {
          "ru": "Проект остановлен на четырёх сериях. Это честно указанный незавершённый проект, который показывает замысел, визуальный язык и умение строить историю без слов.",
          "sr": "Projekat je zaustavljen posle četiri epizode. To je iskreno označen nedovršen projekat koji pokazuje koncept, vizuelni jezik i sposobnost da se priča gradi bez reči.",
          "en": "The project was stopped after four episodes. It is an honestly labeled unfinished project that shows the concept, the visual language and the ability to build a story without words."
        }
      }
    ],
    "cardId": "",
    "featured": false,
    "href": "",
    "newTab": false,
    "links": []
  }
];
window.WORKS_SETTINGS = {"cardSize": "large"};
window.CARDS = [
  {
    "directLink": {
      "label": {
        "ru": "",
        "sr": "",
        "en": ""
      },
      "href": "",
      "outline": {
        "mode": "auto",
        "color": "#2E7D5B"
      }
    },
    "shadow": {
      "mode": "soft",
      "color": "#0d9488"
    },
    "textColor": "#1b2c02",
    "buttonColor": "#8ab53b",
    "border": {
      "mode": "gradient",
      "from": "#bfff47",
      "to": "#7cae1e"
    },
    "id": "python",
    "title": {
      "ru": "Backend разработка",
      "sr": "Backend razvoj",
      "en": "Backend Development"
    },
    "years": "2022 — 2025",
    "summary": {
      "ru": "Создаю утилиты и небольшие программы.",
      "sr": "Pravim alate i manje programe.",
      "en": "I build utilities and small applications."
    },
    "cover": "assets/uploads/works/python/1791839306034-604072222d0ae17cd8c5c0d3e59d9d70.jpg",
    "style": "standard",
    "gradient": {
      "from": "#ffffff",
      "to": "#ffffff"
    },
    "expandable": true,
    "page": "",
    "github": "https://github.com/LeonidTape"
  },
  {
    "directLink": {
      "label": {
        "ru": "",
        "sr": "",
        "en": ""
      },
      "href": "",
      "outline": {
        "mode": "auto",
        "color": "#2E7D5B"
      }
    },
    "shadow": {
      "mode": "default",
      "color": "#0d9488"
    },
    "textColor": "",
    "buttonColor": "",
    "border": {
      "mode": "none",
      "from": "#ffffff",
      "to": "#2dd4bf"
    },
    "id": "ai",
    "title": {
      "ru": "Работа с ИИ",
      "sr": "Rad sa AI",
      "en": "AI work"
    },
    "years": "2025",
    "summary": {
      "ru": "Работаю с нейросетями локально в ComfyUI.",
      "sr": "Radim sa neuronskim mrežama lokalno u ComfyUI-ju.",
      "en": "I work with neural networks locally in ComfyUI."
    },
    "cover": "assets/uploads/works/ai/1791839298274-Google-s-Will-Smith-double-is-better-at-.jpg",
    "style": "standard",
    "gradient": {
      "from": "#0d9488",
      "to": "#2dd4bf"
    },
    "expandable": false,
    "page": "ai.html",
    "github": ""
  },
  {
    "directLink": {
      "label": {
        "ru": "",
        "sr": "",
        "en": ""
      },
      "href": "",
      "outline": {
        "mode": "auto",
        "color": "#2E7D5B"
      }
    },
    "shadow": {
      "mode": "default",
      "color": "#0d9488"
    },
    "textColor": "",
    "buttonColor": "",
    "border": {
      "mode": "none",
      "from": "#0d9488",
      "to": "#2dd4bf"
    },
    "id": "video",
    "title": {
      "ru": "Видеомонтаж",
      "sr": "Video montaža",
      "en": "Video editing"
    },
    "years": "2017 — 2025",
    "summary": {
      "ru": "Создавал готовые ролики: от черновой последовательности до финального рендера.",
      "sr": "Pravio sam gotove videe: od grube montaže do finalnog renderovanja.",
      "en": "I produced finished videos, from rough cut to final render."
    },
    "cover": "assets/uploads/works/video/1791836131107-4.gif",
    "style": "standard",
    "gradient": {
      "from": "#0d9488",
      "to": "#2dd4bf"
    },
    "expandable": true,
    "page": "",
    "github": ""
  },
  {
    "directLink": {
      "label": {
        "ru": "",
        "sr": "",
        "en": ""
      },
      "href": "",
      "outline": {
        "mode": "auto",
        "color": "#2E7D5B"
      }
    },
    "shadow": {
      "mode": "default",
      "color": "#0d9488"
    },
    "textColor": "",
    "buttonColor": "",
    "border": {
      "mode": "none",
      "from": "#0d9488",
      "to": "#2dd4bf"
    },
    "id": "university",
    "title": {
      "ru": "Работа на кафедре",
      "sr": "Rad na katedri",
      "en": "University department work"
    },
    "years": "2022 — 2024",
    "summary": {
      "ru": "Разрабатывал графические материалы для факультета.",
      "sr": "Radio sam grafičke materijale za fakultet.",
      "en": "I created graphic materials for the faculty."
    },
    "cover": "assets/uploads/works/university/1791836296471-635ff502ee5e8_48507_1350.jpg",
    "style": "standard",
    "gradient": {
      "from": "#0d9488",
      "to": "#2dd4bf"
    },
    "expandable": true,
    "page": "",
    "github": ""
  }
];
