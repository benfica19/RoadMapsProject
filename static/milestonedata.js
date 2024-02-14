
async function getBaseData() {
    try {
        const response = await fetch("https://script.googleusercontent.com/macros/echo?user_content_key=L5bvWYL5BdMGGakOlhbJ-KWEoutX8cxDlTutO1oH9VwZEJvbuMsmvpfRCFS-3-1Lt4eadTsWxCLWGQFpj40UOT9UdfTxKKiMm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnHEfkPUxZOxPx3NellYdZvtRwilnqeCLOTkcA2v074Gs-5E0r6SclJaiD3RVR_bBCUqvS5k5WptqYgSsKpU5_PnVNsbLu3flfdz9Jw9Md8uu&lib=MxHd7AEelJsYyiIUxj9Djq-BRxnWXSPyf");
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const base_data = []

        const milestones = Object.keys(data).filter(key => key !== "Milestone");
        milestones.forEach((milestone, index) => {
            const itemsWithDates = data[milestone].map(itemWithDate => {
                const [itemName, startDateString, endDateString] = itemWithDate.split("_");
        
                const startDate = new Date(startDateString).getTime();
                const endDate = new Date(endDateString).getTime();
        
                return {
                    name: itemName,
                    startDate : startDate,
                    endDate : endDate
                };
            });

        // console.log(milestone)
        const milestoneStart = Math.min(...itemsWithDates.map(item => new Date(item.startDate).getTime()));
        // console.log(milestoneStart);
        const milestoneEnd = Math.max(...itemsWithDates.map(item =>  new Date(item.endDate).getTime()));
        // console.log(milestoneEnd);

        const milestoneObj = {
            name: milestone,
            id: milestone.toLowerCase(),
            start: milestoneStart,
            completed: {
                amount: 0
            },
            end: milestoneEnd
        };
        
        const requirements = itemsWithDates.map((item, i) => ({
            name: item.name,
            id: item.name.toLowerCase(),
            parent: milestone.toLowerCase(),
            start: item.startDate,
            completed: {
                amount: 0
            },
            end: item.endDate
        }));
    
        base_data.push(milestoneObj, ...requirements);
    });


    const sample_data = [
    {
        name: 'M1 - Early prototype',
        id: 'm1 - early prototype',
        start: 1707724800000,
        end: 1712300400000
    },
    {
        name: 'Homepage',
        id: 'homepage',
        start: 1707724800000,
        completed: {
            amount: 0.85,
        },
        parent: 'm1 - early prototype',
        end: 1712300400000
    },
    {
        name: 'Login',
        id: 'login',
        start: 1707724800000,
        completed: {
            amount: 0.35,
        },
        parent: 'm1 - early prototype',
        end: 1712300400000
    },
    {
        name: 'M2 - Early prototype',
        id: 'm2 - early prototype',
        start: 1708329600000,
        end: 1711695600000
    },
    {
        name: 'Setup a profile',
        id: 'setup a profile',
        completed: {
            amount: 0.3,
        },
        parent: 'm2 - early prototype',
        start: 1708329600000,
        end: 1711695600000
    },
    {
        name: 'prototype test',
        id: 'prototype test',
        completed: {
            amount: 0.5,
        },
        parent: 'm1 - early prototype',
        start: 1710313200000,
        end: 1711090800000
    },
    {
        name: 'Admin page update',
        id: 'admin page update',
        completed: {
            amount: 0.5,
        },
        parent: 'm1 - early prototype',
        start: 1711522800000,
        end: 1712300400000
    },
    {
        name: 'M2 - First customer test',
        id: 'm2 - first customer test',
        completed: {
            amount: 0.5,
        },
        start: 1708329600000,
        end: 1711695600000
    },
    {
        name: 'Logout',
        id: 'logout',
        completed: {
            amount: 0.2,
        },
        parent: 'm2 - first customer test',
        start: 1708329600000,
        end: 1711695200000
    },
    {
        name: 'Future',
        id: 'future',
        completed: {
            amount: 0.3,
        },
        start: 1707724800000,
        end: 1712300400000
    },
    {
        name: 'Publish album to the public',
        id: 'publish album to the public',
        completed: {
            amount: 0.5,
        },
        parent: 'future',
        start: 1707724800000,
        end: 1712300400000
    },
    {
        name: 'Automatically sync from device',
        id: 'automatically sync from device',
        parent: 'm2 - first customer test',
        completed: {
            amount: 0.5,
        },
        start: 1709329900000,
        end: 1711645600000
    }]
        console.log(base_data); 
        return sample_data; 
    } catch (error) {
        console.error('Error occurred:', error);
        throw error; 
    }
}








