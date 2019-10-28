import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const projects = [
      {
        id: 0,
        budget: 60,
        character: 'Genesis',
        dueDate: '20/09/2019',
        initialDate: '13/09/2019',
        series: 'Final Fantasy',
        percentDone: 0,
        picture: '',
        purchases: {
          purchasesName: [
            'tissu simili cuir',
            'chaussure',
            'ceintures'
          ],
          purchasesPrice: [
            26.7,
            29.6,
            10
          ],
          purchasesStatus: [
            true,
            false,
            false
          ]
        },
        todos: {
          todosName: [
            'veste',
            'épaulières',
            'combinaison',
            'plastron'
          ],
          todosPercent: [
            100,
            80,
            0,
            10
          ],
          todosTime: [
            30,
            0,
            0,
            0
          ]
        },
        references: []
      },
      {
        id: 1,
        budget: 80,
        character: 'Jasmine',
        dueDate: '25/12/2019',
        initialDate: '21/10/2019',
        series: 'Aladdin',
        percentDone: 0,
        picture: '',
        purchases: {
          purchasesName: [
            'tissus',
            'mercerie'
          ],
          purchasesPrice: [
            40,
            30
          ],
          purchasesStatus: [
            true,
            true
          ]
        },
        todos: {
          todosName: [
            'haut',
            'pantalon',
            'jupe',
            'ceinture',
            'lampe',
            'perruque'
          ],
          todosPercent: [
            0,
            0,
            0,
            0,
            0,
            0
          ],
          todosTime: [
            0,
            0,
            0,
            0,
            0,
            0
          ]
        },
        references: []
      },
    ];
    return { projects };
  }
}
