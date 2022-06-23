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

export const bestSellingTvs = () => {
    let arr = [
        `Want to know what the best selling TV there is? We looked all over and compared several results. After our research, we decided this TV below was the best overall pick! Click on the Buy Now button to view it on Amazon.`,
        `Need to know what the top rated TV there is? We looked everywhere and compared a ton of TVs. After our investigation, we concluded this TV below was the best generally speaking pick! Click on the Buy Now button to see it on Amazon.`,
        `Do you want to know what the best selling TV there is? We looked all over and compared several results. After our research, we decided this TV below was the best overall pick! Click on the Buy Now button to view it on Amazon.`,
        `Would you like to know what the top TV there is? We looked everywhere and compared all the top results. After digging, we concluded this TV below was the best generally pick! Click on the Buy Now button to see it on Amazon and learn more.`,
        `Want to know what the best selling TV there is? We looked all over and compared all the top results. After our research, we decided this TV below was the best overall pick! Click on the Buy Now button to view it on Amazon.`,
        `Curious to know what the best selling TV there is? We looked all over and compared the majority of the top results. After our research, we decided this TV below was the best overall pick! Click on the Buy Now button to view it on Amazon.`,
        `In a rush? Curious to know what the best selling TV there is? We looked all over and compared the majority of the top results. After our research, we decided this TV below was the best overall pick! Click on the Buy Now button to view it on Amazon.`,
        `In a hurry? Want to know what the top rated TV there is? We looked everywhere and thought about most of the top outcomes. After our digging, we concluded this TV underneath was the best generally speaking pick! Click on the Buy Now button to see it on Amazon.`,
        `Wonder what the absolute best TV there is for this size? Well we did all the heavy lifting for you and after comparing the top results, this is the number one TV we found! Just click on the Buy Now button to view it on Amazon.`,
        `Do you ever wonder what the absolute best TV there is for this size? Well no worries! We did all the heavy lifting for you and after comparing the top results, this is the number one TV we found! Just simply click on the Buy Now button to view it on Amazon.`,
        `In a rush and need a quick recommendation?  No worries! We did all the heavy lifting for you and after comparing the top results, this is the number one TV we found! Just simply click on the Buy Now button to view it on Amazon.`,
        `Short on time? No worries. We reviewed all of the top TVs on Amazon and have determined this is the best overall TV. How does it compare to the TV you had in mind? Click on the Buy Now button to view more details. See what all the other owners are saying about it in the Reviews section!`,
        `In a rush and need a quick recommendation? We got you covered. We looked at all the top results on Amazon and have determined this is the absolute best choice! Don&apos;t believe us? Check out the reviews on Amazon by clicking the Buy now button to learn more.`,
        `In a rush and need a fast recommendation? Well, we got you covered. We looked at all the best results on Amazon and have determined this is the absolute best choice! Don&apos;t believe us? Check out all the stellar reviews on Amazon by clicking the Buy now button to learn more.`,
        `In a hurry and need a quick suggestion? We got you covered. We took a gander at the top results on Amazon and have decided this is the very best option! Don&apos;t trust us? Look at every one of the top reviews on Amazon by tapping the Buy currently button to find out more.`
    ]
    
    return arr[Math.floor(Math.random() * arr.length)]
}

export const randomOtherWeightsString = (b) => {
    let arr = [
        `Curious how much other TV sizes weigh? Check them out below! Click on the TV inch size to view more details.`,
        `Curious about how much other TV sizes weigh? Check them out below! Click on the TV inch size to view more details.`,
        `Are you curious about how much other TV sizes weigh? Check them out below! Click on the TV inch size to view more details on Amazon.`,
        `Want to know how much other TV sizes weigh? See below:`,
        `Want to know how much all the other TV sizes weigh? See below:`,
        `Do you want to know how much other TV sizes weigh? Check them out below:`,
        `What about other TV sizes? We got you covered. Check them out in the table below.`,
        `Below you will find additional weights for other sized TVs. Click on the TV inch size to view more details.`,
        `Below you will find more weights for other sized TVs. Click on the TV inch size to view more details.`,
        `See below you will find more weights for other sized TVs. Click the TV inch size to view more details.`,
        `Below you will see more weights for other sized TVs. Click on the TV inch size to view more details on Amazon.`
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

export const randomWallMountsStringThree = () => {
    let arr = [
        `Need a TV mount for that new TV you just bought? Below you find a specifically curated list of the top best TV mounts for your TV. They will fit your TV perfectly and even have been reviewed by a huge number of people on Amazon. Click the Buy Now link to learn more.`,
        `Do you need a TV mount for that new TV you just bought? Below you see a curated list of the top best TV mounts for your TV. They will fit your TV perfectly and even have been reviewed by a large number of people on Amazon. Click the Buy Now link to learn more.`,
        `Need a TV mount for that new TV you recently purchased? Underneath you find an explicitly organized rundown of the top best TV mounts for your TV. They will accommodate your TV impeccably and even have been checked on by countless individuals on Amazon. Click the Buy Now button to find out more.`,
        `Shopping for TV mounts can be stressful. Let us help. We found a list of the best mounts with different functionalities so you have a few options to pick from. Remember to pay attention to if you want the swivel, tilting, or full motion for your mount.`, 
        `Looking for TV mounts can be distressing. Allow us to help. We tracked down a rundown of the best mounts with various functionalities so you have a couple of choices to pick from. Make sure to focus functionalities like if you need to tilt, swivel, or full motion for your mount.`,
        `Shopping around for TV mounts can be worrisome. We can help. We found a list of the top TV mounts with different abilities so you have a couple options to pick from. Don&apos;t forget to pay attention to if you want the swivel, tilting, or full motion for your mount.`, 
        `Looking for TV mounts can be troubling. We can help. We found a rundown of the top TV mounts with various capacities so you several choices to pick from. Make sure to focus functionalities like if you need to tilt, swivel, or full motion for your mount.`,
        `Looking for a TV mount but not sure which one to get? Or maybe you have a fireplace and need something strong and sturdy to hold above it? Below you will see a list of the best TV mounts we could find. Click on Buy Now to learn more!`,
        `Searching for a TV mount yet not certain which one to get? Or on the other hand perhaps you have a fireplace and need areas of strength for something strong to hold above it? Underneath you will see a rundown of the best TV mounts we could find. Click on Buy Now to find out more!`,
        `Browsing for TV mounts can be a headache. We made it easy and compiled a few of the best TV mounts for your TV! Make sure to think about if you want full motion or only need it to tilt in a certain direction. Always check that it fits your specific TV dimensions and weight.`,
        `Perusing for TV mounts can be a huge pain. We made it simple and gathered a couple of the best TV mounts for your TV! Make sure to think about if you want swivel, full motion, or only need it to tilt in a certain direction. Continuously check that it accommodates your particular TV dimensions and weight.`
    ]

    return arr[Math.floor(Math.random() * arr.length)]
}