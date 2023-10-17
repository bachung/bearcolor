const [expectedR, expectedG, expectedB] = [133, 91, 82];

export type Bear = {
    name: string,
    url: string,
    defaultColor: [number, number, number]
};

export const Bears: Bear[] = [
    {name: 'Smile', url: 'https://www.gstatic.com/android/keyboard/emojikitchen/20210831/u1f43b/u1f43b_u1f600.png', defaultColor: [expectedR, expectedG, expectedB]},
    {name: 'Rofl', url: 'https://www.gstatic.com/android/keyboard/emojikitchen/20210831/u1f43b/u1f43b_u1f923.png', defaultColor: [expectedR, expectedG, expectedB]},
    {name: 'Cowbear', url: 'https://www.gstatic.com/android/keyboard/emojikitchen/20210831/u1f43b/u1f43b_u1f920.png', defaultColor: [expectedR, expectedG, expectedB]},
    // {name: 'Celebrate', url: 'https://www.gstatic.com/android/keyboard/emojikitchen/20210831/u1f43b/u1f43b_u1f973.png', defaultColor: [expectedR, expectedG, expectedB]},
    {name: 'Frowning', url: 'https://www.gstatic.com/android/keyboard/emojikitchen/20210831/u1f43b/u1f43b_u1f626.png', defaultColor: [expectedR, expectedG, expectedB]},
    {name: 'Anguished', url: 'https://www.gstatic.com/android/keyboard/emojikitchen/20210831/u1f43b/u1f43b_u1f627.png', defaultColor: [expectedR, expectedG, expectedB]},
    {name: 'Starstruck', url: 'https://www.gstatic.com/android/keyboard/emojikitchen/20210831/u1f43b/u1f43b_u1f929.png', defaultColor: [expectedR, expectedG, expectedB]},
    // {name: 'Thinking', url: 'https://www.gstatic.com/android/keyboard/emojikitchen/20210831/u1f43b/u1f43b_u1f914.png', defaultColor: [expectedR, expectedG, expectedB]},
    {name: 'Injured', url: 'https://www.gstatic.com/android/keyboard/emojikitchen/20210831/u1f43b/u1f43b_u1f915.png', defaultColor: [expectedR, expectedG, expectedB]},
    {name: 'Sleepy', url: 'https://www.gstatic.com/android/keyboard/emojikitchen/20210831/u1f43b/u1f43b_u1f634.png', defaultColor: [expectedR, expectedG, expectedB]},
    {name: 'Sad', url: 'https://www.gstatic.com/android/keyboard/emojikitchen/20210831/u1f43b/u1f43b_u1f622.png', defaultColor: [expectedR, expectedG, expectedB]},
    {name: 'Cool', url: 'https://www.gstatic.com/android/keyboard/emojikitchen/20210831/u1f43b/u1f43b_u1f60e.png', defaultColor: [expectedR, expectedG, expectedB]},
    {name: 'Monocle', url: 'https://www.gstatic.com/android/keyboard/emojikitchen/20210831/u1f43b/u1f43b_u1f9d0.png', defaultColor: [expectedR, expectedG, expectedB]},
    {name: 'Accounting', url: 'https://www.gstatic.com/android/keyboard/emojikitchen/20210831/u1f43b/u1f43b_u1f913.png', defaultColor: [expectedR, expectedG, expectedB]},
    {name: 'Pleading', url: 'https://www.gstatic.com/android/keyboard/emojikitchen/20210831/u1f43b/u1f43b_u1f97a.png', defaultColor: [expectedR, expectedG, expectedB]},
    {name: 'Angry', url: 'https://www.gstatic.com/android/keyboard/emojikitchen/20210831/u1f43b/u1f43b_u1f620.png', defaultColor: [expectedR, expectedG, expectedB]},
    {name: 'Superfrown', url: 'https://www.gstatic.com/android/keyboard/emojikitchen/20210831/u1f43b/u1f43b_u2639-ufe0f.png', defaultColor: [expectedR, expectedG, expectedB]},
    {name: 'Pensive', url: 'https://www.gstatic.com/android/keyboard/emojikitchen/20210831/u1f43b/u1f43b_u1f614.png', defaultColor: [expectedR, expectedG, expectedB]},
    {name: 'Melting', url: 'https://www.gstatic.com/android/keyboard/emojikitchen/20211115/u1fae0/u1fae0_u1f43b.png', defaultColor: [expectedR, expectedG, expectedB]},
    {name: 'Exploding', url: 'https://www.gstatic.com/android/keyboard/emojikitchen/20210831/u1f43b/u1f43b_u1f92f.png', defaultColor: [expectedR, expectedG, expectedB]},
    {name: 'Zany', url: 'https://www.gstatic.com/android/keyboard/emojikitchen/20210831/u1f43b/u1f43b_u1f92a.png', defaultColor: [expectedR, expectedG, expectedB]},
    {name: 'Money', url: 'https://www.gstatic.com/android/keyboard/emojikitchen/20210831/u1f43b/u1f43b_u1f911.png', defaultColor: [expectedR, expectedG, expectedB]},
    // {name: 'Hide', url: 'https://www.gstatic.com/android/keyboard/emojikitchen/20211115/u1fae3/u1fae3_u1f43b.png', defaultColor: [expectedR, expectedG, expectedB]},
    {name: 'Peek', url: 'https://www.gstatic.com/android/keyboard/emojikitchen/20210831/u1f43b/u1f43b_u1f573-ufe0f.png', defaultColor: [expectedR, expectedG, expectedB]},
    {name: 'Angel', url: 'https://www.gstatic.com/android/keyboard/emojikitchen/20210831/u1f43b/u1f43b_u1f607.png', defaultColor: [expectedR, expectedG, expectedB]},
    {name: 'Single Tear', url: 'https://www.gstatic.com/android/keyboard/emojikitchen/20210831/u1f43b/u1f43b_u1f972.png', defaultColor: [expectedR, expectedG, expectedB]},
    {name: 'Sweat Smile', url: 'https://www.gstatic.com/android/keyboard/emojikitchen/20210831/u1f43b/u1f43b_u1f605.png', defaultColor: [expectedR, expectedG, expectedB]},
    {name: 'Upside Down', url: 'https://www.gstatic.com/android/keyboard/emojikitchen/20210831/u1f43b/u1f43b_u1f643.png', defaultColor: [expectedR, expectedG, expectedB]},
];