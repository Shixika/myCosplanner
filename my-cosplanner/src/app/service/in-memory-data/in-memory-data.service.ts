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
        purchases: [
          {
            name: 'tissu simili cuir',
            price: 26.7,
            status: true
          },
          {
            name: 'chaussure',
            price: 29.6,
            status: false
          },
          {
            name: 'ceintures',
            price: 10,
            status: false
          }
        ],
        todos: [
          {
            name: 'veste',
            percent: 100,
            time: '30h',
            estimate: '35h'
          },
          {
            name: 'épaulières',
            percent: 80,
            time: '',
            estimate: '5h'
          },
          {
            name: 'combinaison',
            percent: 0,
            time: '',
            estimate: '10h'
          },
          {
            name: 'plastron',
            percent: 10,
            time: '',
            estimate: '3h'
          }
        ],
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
        purchases: [
          {
            name: 'tissus',
            price: 40,
            status: true
          },
          {
            name: 'mercerie',
            price: 30,
            status: true
          }
        ],
        todos: [
          {
            name: 'haut',
            percent: 0,
            time: '',
            estimate: '',
          },
          {
            name: 'pantalon',
            percent: 0,
            time: '',
            estimate: '',
          },
          {
            name: 'jupe',
            percent: 0,
            time: '',
            estimate: '',
          },
          {
            name: 'ceinture',
            percent: 0,
            time: '',
            estimate: '',
          },
          {
            name: 'lampe',
            percent: 0,
            time: '',
            estimate: '',
          },
          {
            name: 'perruque',
            percent: 0,
            time: '',
            estimate: '',
          }
        ],
        references: []
      },
      {
        id: 2,
        budget: 20,
        character: 'Bulma',
        dueDate: '',
        initialDate: '',
        series: 'Dragon Ball',
        percentDone: 100,
        picture: '',
        purchases: [
          {
            name: 'casquette',
            price: 10,
            status: true
          }
        ],
        todos: [
          {
            name: 'Détecteur',
            percent: 100,
            time: '3h',
            estimate: '2h',
          },
          {
            name: 'casquette',
            percent: 100,
            time: '1h30',
            estimate: '2h',
          },
          {
            name: 'perruque',
            percent: 100,
            time: '1h',
            estimate: '2h',
          }
        ],
        references: []
      }
    ];
    return { projects };
  }
}
