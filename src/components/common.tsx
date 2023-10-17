export const [expectedR, expectedG, expectedB] = [133, 91, 82];

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
];