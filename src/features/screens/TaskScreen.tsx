import React, {useCallback, useEffect, useRef, useState} from 'react';
import TaskList from '../components/Task/TaskList';
import {TaskPreview} from '@/appTypes/task';
import {View} from 'react-native';
import globalStyles from '@/styles/global';
import Empty from '@/features/components/Task/Empty';
import NewTaskModal from '@/features/components/Task/NewTaskModal';
import {TaskStackScreenProps} from '@/appTypes/navigation';
import Header from '@/features/components/Header/Header';
import {
  getLocalStorageItem,
  setLocalStorageObject,
} from '@/lib/storage/local-storage';

export default function TaskScreen({
  navigation,
}: TaskStackScreenProps<'Tasks'>) {
  const [tasks, setTasks] = useState<TaskPreview[] | null>(null);
  const itemRefs = useRef(new Map());

  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [modalInitialData, setModalInitialData] = useState<TaskPreview | null>(
    null,
  );

  useEffect(() => {
    (async () => {
      if (tasks === null) {
        const savedTasks = await getLocalStorageItem('tasks');
        if (savedTasks) {
          const parsedTasks = JSON.parse(savedTasks);
          if (Array.isArray(parsedTasks)) {
            setTasks(parsedTasks);
          }
        }
      } else {
        setLocalStorageObject('tasks', tasks);
      }
    })();
  }, [tasks]);

  const goToDetail = (id: number) => {
    if (id && tasks !== null) {
      const currentTask = tasks.find(task => task.id === id);
      if (currentTask) {
        navigation.navigate('TaskDetail', currentTask);
      }
    }
  };

  const editTask = (id?: number) => {
    if (id) {
      const editedTask = tasks?.find(task => task.id === id);
      if (editedTask) {
        setModalInitialData(editedTask);
      }
    } else {
      setModalInitialData(null);
    }
    setShowNewTaskModal(true);
  };

  const onModalClose = () => {
    setShowNewTaskModal(false);
    setModalInitialData(null);
  };

  const submitNewTask = useCallback(
    ({text, status}: Pick<TaskPreview, 'text' | 'status'>) => {
      if (text) {
        setTasks(current => {
          if (!modalInitialData?.id) {
            if (current === null || current.length === 0) {
              return [
                {
                  id: 1,
                  text,
                  status,
                  created: new Date().toISOString(),
                },
              ];
            }
            const sortBiggestId = current.sort((a, b) =>
              a.id > b.id ? 1 : -1,
            );

            return [
              ...current,
              {
                id: sortBiggestId[sortBiggestId.length - 1].id + 1,
                text,
                status,
                created: new Date().toISOString(),
              },
            ];
          } else {
            const newTasks = current === null ? [] : [...current];
            const editIndex = newTasks.findIndex(
              task => task.id === modalInitialData.id,
            );
            if (editIndex > -1) {
              newTasks[editIndex].text = text;
              newTasks[editIndex].status = status;
            }
            return newTasks;
          }
        });
        onModalClose();
      }
    },
    [setTasks, modalInitialData, showNewTaskModal],
  );

  const onRemoveTask = useCallback(
    async (id: number) => {
      if (id) {
        setTasks(current => {
          if (current && current.length > 1) {
            const newTasks = [...current];
            const outIndex = current.findIndex(task => task.id === id);
            if (outIndex > -1) {
              newTasks.splice(outIndex, 1);
            }
            return newTasks;
          }
          return [];
        });
      }
    },
    [setTasks],
  );

  return (
    <>
      <Header screenName="Tasks" />
      <View style={globalStyles.f1}>
        {!tasks || tasks.length === 0 ? (
          <Empty onPress={editTask} />
        ) : (
          <TaskList
            data={tasks}
            onEditTask={editTask}
            onTextPress={goToDetail}
            onRemove={onRemoveTask}
            onOrderChange={setTasks}
            itemRefs={itemRefs}
          />
        )}
        <NewTaskModal
          initialData={modalInitialData}
          onSubmit={submitNewTask}
          isOpen={showNewTaskModal}
          onClose={onModalClose}
        />
      </View>
    </>
  );
}
