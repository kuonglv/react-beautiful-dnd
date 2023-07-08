import React, { useState } from 'react';
import styled from '@emotion/styled';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const Container = styled.div`
  padding: 20px 30px;
`;

const Kanban = () => {

  const questionsData = [
    {
      id: 1,
      title: 'Anh',
      order: 0,
      display: true
    },
    {
      id: 2,
      title: 'Còn',
      order: 1,
      display: true
    },
    {
      id: 3,
      title: 'Nợ',
      order: 2,
      display: true
    },
    {
      id: 4,
      title: 'Em',
      order: 3,
      display: true
    }
  ];

  const answersData = [
    {
      id: '11',
      title: ''
    },
    {
      id: '22',
      title: ''
    },
    {
      id: '33',
      title: ''
    },
    {
      id: '44',
      title: ''
    }
  ];

  const [questions, setQuestions] = useState(questionsData);
  const [answers, setAnswers] = useState(answersData);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    console.log(`onDragEnd`);
    console.log(result);

    if (source.droppableId && destination.droppableId) {
      // Trường hợp kéo từ đề bài xuống đáp án
      if (source.droppableId.toString().startsWith('QUESTION') && destination.droppableId.toString().startsWith('ANSWER')) {
        if (destination) {
          //Xử lý đáp án
          const newAnwers = [...answers];
          const answerItem = answers[destination.index];

          let newItem = { ...answerItem };
          newItem.title = questions[source.index].title;
          newItem.order = questions[source.index].order;
          newAnwers[destination.index] = newItem;

          setAnswers(newAnwers);

          //Update lại phần câu hỏi
          const newQuestions = [...questions];
          const q = {...questions[source.index]};
          q.display = false;
          newQuestions[source.index] = q;

          setQuestions(newQuestions)

          //Khóa không cho kéo tiếp câu hỏi vào đáp án 
        }
      }
      // Trường hợp kéo từ đáp án sang đáp án (sắp xếp lại)
      if (source.droppableId.toString().startsWith('ANSWER') && destination.droppableId.toString().startsWith('ANSWER')) {
        if (destination) {
          const newAnwers = [...answers];
          const oldItem = { ...newAnwers[source.index] };
          const newItem = { ...newAnwers[destination.index] };
          newAnwers[destination.index] = oldItem;
          newAnwers[source.index] = newItem;
          setAnswers(newAnwers);
        }
      }
      //Trường hợp trả lại câu trả lời:
      if (source.droppableId.toString().startsWith('ANSWER') && destination.droppableId.toString().startsWith('QUESTION')) {
        //1. Xác định index cần trả từ đối tượng chọn
        console.log(`source`, source)
        const destOrder = answers[source.index].order;
        console.log(`destIndex`, destOrder);


        //2. Trả lại
        const newQuestions = [...questions];
        newQuestions[destOrder] = {...questions[source.index]}
        newQuestions[destOrder].display = true;

        setQuestions(newQuestions);

        //3. Xóa ở danh sách trả lời
        const newAnswers = [...answers];
        const updateAnswer = answers[source.index];
        updateAnswer.order = null;
        updateAnswer.title = '';

        newAnswers[source.index] = updateAnswer;
        setAnswers(newAnswers);
      }
    }
  };

  const onDragStart = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
  }

  const onDragUpdate = (result) => {
    const { source, destination } = result;
  }

  return (
    <DragDropContext
      onDragEnd={(result) => onDragEnd(result)}
      onDragStart={(result) => onDragStart(result)}
      onDragUpdate={(result) => onDragUpdate(result)}
    >
      <Container>
        <div className=''>
          <h2>Đề bài</h2>
          <div style={{ display: 'flex', padding: '10px 20px' }}>
            {
              questions.map((q, index) => (
                <div key={q.id} style={{ background: 'white', margin: '10px', border: '2px dashed #CCC', borderRadius: '10px' }}>
                  <Droppable droppableId={`QUESTION-${q.id}`} direction="horizontal">
                    {(provided, snapshot) => (
                      <div ref={provided.innerRef}
                        {...provided.droppableProps} style={{ background: 'white', width: '120px', height: '120px', borderRadius: '10px', overflow: 'hidden'}}>
                        <Draggable key={q.id} draggableId={`${q.id}`} index={index} isDragDisabled={!q.display}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div style={{ padding: '20px', width: '80px', height: '80px', cursor: 'move', display: q.display ? 'block' : 'none'}}>
                                {q.title}
                              </div>
                            </div>)}
                        </Draggable>
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              ))
            }
          </div>
        </div>
        <div className=''>
          <h2>Trả lời</h2>
          <div style={{ display: 'flex', padding: '10px 20px' }}>
            {
              answers.map((a, index) => (
                <div key={a.id} style={{ background: 'white', margin: '10px', border: '2px dashed #CCC', borderRadius: '10px' }}>
                  <Droppable droppableId={`ANSWER-${a.id}`} direction="horizontal">
                    {(provided, snapshot) => (
                      <div ref={provided.innerRef}
                        {...provided.droppableProps} style={{ background: 'white', width: '120px', height: '120px', borderRadius: '10px', overflow: 'hidden'}}>
                        <Draggable key={a.id} draggableId={`${a.id}`} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div style={{ padding: '20px', width: '80px', height: '80px', cursor: 'move' }}>
                                {a.title}
                              </div>
                            </div>)}
                        </Draggable>
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              ))
            }
          </div>
        </div>
      </Container>
    </DragDropContext>
  );
};

export default Kanban;
