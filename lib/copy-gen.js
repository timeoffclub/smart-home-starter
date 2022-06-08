 // Randomize content below
 export const randomIntroString = () => {
    let arr = [
        `When you are shopping for a TV it is important to consider multiple factors like price, weight, features, and even mounting solutions.`,
        `When you are browsing for a TV it is important to consider multiple factors like price, features, weight, and even mounting solutions.`,
        `When you are shopping for a TV it is critical to consider multiple factors like price, weight, features, and even mounting solutions.`,
        `When you are looking for a new TV, it's crucial to consider multiple factors such as features, weight, price, and mounting solutions.`,
        `When you are looking to purchase a new TV, it's crucial to consider multiple factors such as features, weight, price, and mounting solutions.`,
        `When you are looking to purchase a new TV, it's crucial to consider multiple elements such as features, weight, price, and mounting solutions.`,
        `When you are looking to purchase a new TV for your home, it's crucial to consider multiple elements such as features, weight, price, and mounting solutions.`,
        `When you are looking to purchase a new TV for your home, it's important to consider multiple elements such as features, weight, price, and mounting solutions.`,
        `When you are looking to purchase a new TV for your home, it's critical to consider multiple elements such as features, weight, price, and mounting solutions.`,
        `People who are interested in new TVs should consider several factors like features, weight, price, and mounting solutions.`,
        `People who are interested in new TVs should consider several elements like features, weight, price, and mounting solutions.`,
        `People who are interested in new TVs should consider several variables like features, weight, price, and mounting solutions.`,
        `People who are interested in new TVs should consider several aspects like features, weight, price, and mounting solutions.`,
        `When you are shopping around for a new TVs should consider several elements like features, weight, price, and mounting solutions.`,
        `When you are shopping around for a new TVs should consider several variables like features, weight, price, and mounting solutions.`,
        `When you are shopping around for a new TVs should consider several aspects like features, weight, price, and mounting solutions.`
    ]

    return arr[Math.floor(Math.random() * arr.length)]
}

export const randomSecondString = () => {
    let arr = [
        `Most consumers want a lighter TV because it is easier to transport, package, and unload from their car. Being able to easily carry your TV ensures minimizing any damage while in transport.`,
        `Most people want a lighter TV because it is easier to transport, package, and unload from their car. Being able to easily carry your TV ensures minimizing any damage while in transport.`,
        `Most consumers want a TV that weighs less because it is easier to transport, package, and unload from their car. Being able to easily carry your TV ensures minimizing any damage while in transport.`,
        `Most consumers want a lighter TV because it is easy to transport, package, and unload from their car. Being able to easily carry your TV ensures minimizing any damage while in transport.`,
        `Most people want a TV that is light because it is easier to carry, package, and unload from their car. Being able to carry your TV ensures reduces the change of damage while in transport.`,
        `Most consumers want a lighter TV because it is easier to transport, package, and unload from their car and into their home. Being able to easily carry your TV ensures minimizing any damage while in transport.`,
        `Most people want a lighter TV because it is much easier to transport, package, and unload from their car. Being able to simply carry your TV ensures minimizing any damage while in transport.`,
        `Most folks want a TV that weighs less because it is easier to transport, package, and unload from their car. You want to be able to easily carry your TV ensures minimizing any damage while in transport.`,
        `Most individuals want a TV that weighs less because it is much easier to carry, package, and remove from their car. Being able to carry your TV ensures minimizing any damage while traveling with it.`
    ]

    return arr[Math.floor(Math.random() * arr.length)]
}

export const randomWeightString = (w,b,h,wt) => {
    let textTransform = ''
    b === 'lg' || b === 'tcl' ? textTransform = 'uppercase' : textTransform = 'capitalize'
    let arr = [
        `A ${w} <span style='text-transform: ${textTransform}'>${b}</span> <span style='text-transform: uppercase'>${h}</span> weighs on average ${wt} lbs.`,
        `An average ${w} <span style='text-transform: ${textTransform}'>${b}</span> <span style='text-transform: uppercase'>${h}</span> weighs exactly ${wt} lbs.`,
        `A ${w} <span style='text-transform: ${textTransform}'>${b}</span> <span style='text-transform: uppercase'>${h}</span> weighs on average ${wt} lbs.`,
        `The weight of a ${w} <span style='text-transform: ${textTransform}'>${b}</span> <span style='text-transform: uppercase'>${h}</span> is ${wt} lbs.`,
        `The average weight of a <span style='text-transform: ${textTransform}'>${b}</span> ${w} <span style='text-transform: uppercase'>${h}</span> is ${wt} lbs.`,
        `The <span style='text-transform: ${textTransform}'>${b}</span> ${w} <span style='text-transform: uppercase'>${h}</span> weighs ${wt} lbs.`,
        `The <span style='text-transform: ${textTransform}'>${b}</span> ${w} <span style='text-transform: uppercase'>${h}</span> weighs exactly ${wt} lbs.`,
        `The average weight of a <span style='text-transform: ${textTransform}'>${b}</span> ${w} <span style='text-transform: uppercase'>${h}</span> is ${wt} lbs.`,
        `The average weight of a ${w} <span style='text-transform: ${textTransform}'>${b}</span> <span style='text-transform: uppercase'>${h}</span> is exactly ${wt} lbs.`,
    ]

    return arr[Math.floor(Math.random() * arr.length)]
}

export const randomOtherWeightsString = (b) => {
    let textTransform = ''
    b === 'lg' || b === 'tcl' ? textTransform = 'uppercase' : textTransform = 'capitalize'
    let arr = [
        `Here are other TV weights for <span style='text-transform: ${textTransform}'>${b}</span> TVs:`,
        `Below are other TV weights for <span style='text-transform: ${textTransform}'>${b}</span> TVs:`,
        `Here are the other TV weights for <span style='text-transform: ${textTransform}'>${b}</span> TVs:`,
        `Here are the weights for all other <span style='text-transform: ${textTransform}'>${b}</span> TVs:`,
        `Below are the weights for all other <span style='text-transform: ${textTransform}'>${b}</span> TVs:`,
        `Below you will find other TV weights for <span style='text-transform: ${textTransform}'>${b}</span> TVs:`,
        `Below you can find other TV weights for <span style='text-transform: ${textTransform}'>${b}</span> TVs:`,
        `Below you will see other TV weights for <span style='text-transform: ${textTransform}'>${b}</span> TVs:`,
        `Below you can see other TV weights for <span style='text-transform: ${textTransform}'>${b}</span> TVs:`,
        `Below are other TV weights for <span style='text-transform: ${textTransform}'>${b}</span> TVs:`,
        `Below you can view the other TV weights for <span style='text-transform: ${textTransform}'>${b}</span> TVs:`
    ]

    return arr[Math.floor(Math.random() * arr.length)]
}

export const randomWallMountsString = (w,b) => {
    let textTransform = ''
    b === 'lg' || b === 'tcl' ? textTransform = 'uppercase' : textTransform = 'capitalize'
    let arr = [
        `Any universal TV mount will work for your <span style='text-transform: ${textTransform}'>${b}</span> ${w} TV as long as its within its dimensions and weigh limit.`,
        `Any universal TV mount will be suitable for your <span style='text-transform: ${textTransform}'>${b}</span> ${w} TV as long as its within its dimensions and weigh limit.`,
        `Any universal TV mount will be appropriate for your <span style='text-transform: ${textTransform}'>${b}</span> ${w} TV as long as its within its dimensions and weigh limit.`,
        `Most universal TV mount will work for your <span style='text-transform: ${textTransform}'>${b}</span> ${w} TV as long as its within its dimensions and weigh limit.`,
        `Most universal TV mount will fit your <span style='text-transform: ${textTransform}'>${b}</span> ${w} TV as long as its within its dimensions and weigh limit.`,
        `Most universal TV mount will be compatible for your <span style='text-transform: ${textTransform}'>${b}</span> ${w} TV as long as its within its dimensions and weigh limit.`,
        `Any universal TV mount will be compatible for your <span style='text-transform: ${textTransform}'>${b}</span> ${w} TV as long as its within its dimensions and weigh limit.`,
        `Most TV mounts are universal and will work with your <span style='text-transform: ${textTransform}'>${b}</span> ${w} TV. Just check to see if the weights and dimensions are compatible with your TV first.`,
        `Almost all universal TV mounts will work for your <span style='text-transform: ${textTransform}'>${b}</span> ${w} TV. Verify that it does not exceed the weight limit and fits the dimensions of your TV.`,
        `Almost all universal TV mounts will be suitable for your <span style='text-transform: ${textTransform}'>${b}</span> ${w} TV. Confirm that it does not exceed the weight limit and fits the dimensions of your TV.`,
        `Almost all universal TV mounts will be suited for your <span style='text-transform: ${textTransform}'>${b}</span> ${w} TV. Double check that it does not exceed the weight limit and fits the dimensions of your TV.`
    ]

    return arr[Math.floor(Math.random() * arr.length)]
}

export const randomWallMountsStringTwo = () => {
    let arr = [
        `Other things to be aware of are if you want it to move forward and back, swivel to the left or right, or if the height should be adjustable for situations like a fireplace.`,
        `Other factors to be cognizant of are if you want it to move forward and back, swivel to the left or right, or if the height should be adjustable for situations like a fireplace.`,
        `Other variables to be cognizant of are if you want it to move forward and back, swivel to the left or right, or if the height should be adjustable for situations like a fireplace.`,
        `Other factors to be cognizant of is if you want the height to be adjustable, move back or forward, or if you want to swivel it to the left or right.`,
        `Other variables to be aware of is if you want the height to be adjustable, move back or forward, or if you want to swivel it to the left or right.`,
        `Other things to be aware of is if you want the height to be adjustable, move back or forward, or if you want to swivel it to the left or right.`,
        `Other things to be aware of is if you want to swivel it to the left or right, if you want the height to be adjustable, or move back or forward.`,
        `Other variables to be aware of is if you want to swivel it to the left or right, if you want the height to be adjustable, or move back or forward.`,
        `Other factors to be aware of is if you want to swivel it to the left or right, if you want the height to be adjustable, or move back or forward.`,
        `Other details to be aware of is if you want to swivel it to the left or right, if you want the height to be adjustable, or move back or forward.`,
        `Other details to be aware of is if you want to swivel it to the left or right, if you want the height to be adjustable, or move back or forward.`,
        `Other details to be aware of is if you want to swivel it to the left or right, if you want the height to be adjustable, or move back or forward.`,
        `Also take note of if you want to swivel it to the left or right, if you want the height to be adjustable, or move back or forward.`,
        `Also take note of if you want to swivel it to the left or right, if you want the height to be adjustable, or move back or forward.`,
        `Also take note of if you want to swivel it to the left or right, if you want the height to be adjustable, or move back or forward.`
    ]

    return arr[Math.floor(Math.random() * arr.length)]
}